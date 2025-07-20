package com.finance.tracker.repository;

import com.finance.tracker.model.Budget;
import com.finance.tracker.model.Category;
import com.finance.tracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.YearMonth;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

    // ✅ Existing methods
    Optional<Budget> findByUserAndCategoryAndMonth(User user, Category category, YearMonth month);
    List<Budget> findByUser(User user);

    // ✅ 🔧 Add this missing method
    List<Budget> findByUserAndMonth(User user, YearMonth month);

    int countByUserId(UUID userId);
}
