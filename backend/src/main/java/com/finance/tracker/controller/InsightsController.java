package com.finance.tracker.controller;

import com.finance.tracker.model.*;
import com.finance.tracker.repository.*;
import com.finance.tracker.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/insights")
@RequiredArgsConstructor
public class InsightsController {

    private final TransactionService transactionService;
    private final BudgetRepository budgetRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    // 📌 1. Total expenses for month
    @GetMapping("/monthly-total")
    public BigDecimal getMonthlyTotal(@RequestParam String month, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        YearMonth ym = YearMonth.parse(month);
        return transactionService.getMonthlyTransactions(user, ym).stream()
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // 📌 2. Category-wise expenses (for pie chart)
    @GetMapping("/category-breakdown")
    public Map<String, BigDecimal> getCategoryBreakdown(@RequestParam String month, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        YearMonth ym = YearMonth.parse(month);
        List<Transaction> transactions = transactionService.getMonthlyTransactions(user, ym);

        return transactions.stream()
                .collect(Collectors.groupingBy(
                        t -> t.getCategory().getName(),
                        Collectors.reducing(BigDecimal.ZERO, Transaction::getAmount, BigDecimal::add)
                ));
    }

    // 📌 3. Budget vs Actual for each category
    @GetMapping("/budget-comparison")
    public List<Map<String, Object>> getBudgetComparison(@RequestParam String month, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        YearMonth ym = YearMonth.parse(month);
        List<Transaction> transactions = transactionService.getMonthlyTransactions(user, ym);
        List<Category> categories = categoryRepository.findByUser(user);

        // ✅ Fixed: Change from UUID to Long
        Map<Long, BigDecimal> actualMap = transactions.stream()
                .collect(Collectors.groupingBy(
                        t -> t.getCategory().getId(),
                        Collectors.reducing(BigDecimal.ZERO, Transaction::getAmount, BigDecimal::add)
                ));

        List<Map<String, Object>> comparison = new ArrayList<>();

        for (Category category : categories) {
            BigDecimal actual = actualMap.getOrDefault(category.getId(), BigDecimal.ZERO);
            Optional<Budget> budgetOpt = budgetRepository.findByUserAndCategoryAndMonth(user, category, ym);

            Map<String, Object> item = new HashMap<>();
            item.put("category", category.getName());
            item.put("actual", actual);
            item.put("budget", budgetOpt.map(Budget::getLimitAmount).orElse(BigDecimal.ZERO));

            comparison.add(item);
        }

        return comparison;
    }
}
