package com.finance.tracker.repository;

import com.finance.tracker.model.Transaction;
import com.finance.tracker.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.user.id = :userId")
    double sumAmountByUserId(@Param("userId") UUID userId);

    @Query(
            value = "SELECT DATE(t.date) AS day, SUM(t.amount) AS total " +
                    "FROM transaction t " +
                    "WHERE t.user_id = :userId " +
                    "GROUP BY DATE(t.date) " +
                    "ORDER BY day",
            nativeQuery = true
    )
    List<Object[]> sumByDate(@Param("userId") UUID userId);
}
