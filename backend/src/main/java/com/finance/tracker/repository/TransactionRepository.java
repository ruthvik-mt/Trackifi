package com.finance.tracker.repository;

import com.finance.tracker.model.Transaction;
import com.finance.tracker.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Fetch all transactions for a user, ordered by date descending
    List<Transaction> findAllByUserOrderByDateDesc(User user);

    // Fetch all transactions for a user within a date range
    List<Transaction> findByUserAndDateBetween(User user, LocalDate start, LocalDate end);

    // Fetch transactions for a user by category ID
    List<Transaction> findByUserAndCategoryId(User user, Long categoryId);

    // Paginated fetch for a user's transactions
    Page<Transaction> findAllByUser(User user, Pageable pageable);

}
