package com.finance.tracker.service;

import com.finance.tracker.model.Budget;
import com.finance.tracker.model.Transaction;
import com.finance.tracker.model.User;
import com.finance.tracker.repository.BudgetRepository;
import com.finance.tracker.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetAlertService {

    private final BudgetRepository budgetRepository;
    private final TransactionRepository transactionRepository;
    private final EmailService emailService;

    public void checkAndNotify(User user) {
        YearMonth month = YearMonth.now();
        LocalDate start = month.atDay(1);
        LocalDate end = month.atEndOfMonth();

        List<Transaction> transactions = transactionRepository.findByUserAndDateBetween(user, start, end);
        List<Budget> budgets = budgetRepository.findByUserAndMonth(user, month);

        for (Budget budget : budgets) {
            BigDecimal spent = transactions.stream()
                    .filter(t -> budget.getCategory() == null || t.getCategory().equals(budget.getCategory()))
                    .map(Transaction::getAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            BigDecimal threshold = budget.getLimitAmount().multiply(BigDecimal.valueOf(0.9));

            if (spent.compareTo(threshold) >= 0) {
                String subject = "⚠ Budget Alert: Spending Threshold Exceeded";
                String body = String.format("""
                        Hi %s,
                        
                        You've spent ₹%.2f out of your ₹%.2f budget %s for %s.
                        Please track your spending to stay on budget.
                        
                        – Trackifi
                        """,
                        user.getFullName(),
                        spent,
                        budget.getLimitAmount(),
                        budget.getCategory() != null ? "in " + budget.getCategory().getName() : "",
                        month);

                emailService.sendSimpleEmail(user.getEmail(), subject, body);
            }
        }
    }
}
