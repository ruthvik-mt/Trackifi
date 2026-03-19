package com.finance.tracker.service;

import com.finance.tracker.model.Transaction;
import com.finance.tracker.model.User;
import com.finance.tracker.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final BudgetAlertService budgetAlertService; 

    /** Create a new transaction for a user. */
    public Transaction createTransaction(Transaction transaction) {
        Transaction savedTransaction = transactionRepository.save(transaction);

        // Check for budget threshold after saving
        budgetAlertService.checkAndNotify(savedTransaction.getUser());

        return savedTransaction;
    }

    /** Get all transactions for a user, sorted by most recent date. */
    public List<Transaction> getUserTransactions(User user) {
        return transactionRepository.findAllByUserOrderByDateDesc(user);
    }

    /** Get paginated transactions for a user. */
    public Page<Transaction> getUserTransactions(User user, Pageable pageable) {
        return transactionRepository.findAllByUser(user, pageable);
    }

    /** Update a transaction only if it belongs to the current user. */
    public Transaction update(Long id, Transaction updatedTransaction, User user) {
        Transaction existing = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found with ID: " + id));

        if (!existing.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to update this transaction.");
        }

        existing.setAmount(updatedTransaction.getAmount());
        existing.setDescription(updatedTransaction.getDescription());
        existing.setDate(updatedTransaction.getDate());
        existing.setCategory(updatedTransaction.getCategory());

        Transaction saved = transactionRepository.save(existing);

        budgetAlertService.checkAndNotify(user);

        return saved;
    }

    /** Delete a transaction if the user owns it. */
    @Transactional
    public void delete(Long id, User user) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found with ID: " + id));

        if (!transaction.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to delete this transaction.");
        }

        // Force fetch lazy-loaded category to avoid null on delete
        transaction.getCategory().getName();

        transactionRepository.delete(transaction);

        budgetAlertService.checkAndNotify(user);
    }

    /** Fetch transactions for a specific year-month range. */
    public List<Transaction> getMonthlyTransactions(User user, YearMonth month) {
        LocalDate start = month.atDay(1);
        LocalDate end = month.atEndOfMonth();
        return transactionRepository.findByUserAndDateBetween(user, start, end);
    }

    /** Fetch transactions by category. */
    public List<Transaction> getByCategory(User user, Long categoryId) {
        return transactionRepository.findByUserAndCategoryId(user, categoryId);
    }

    /** Fetch transactions between two dates. */
    public List<Transaction> getByDateRange(User user, LocalDate start, LocalDate end) {
        return transactionRepository.findByUserAndDateBetween(user, start, end);
    }
}
