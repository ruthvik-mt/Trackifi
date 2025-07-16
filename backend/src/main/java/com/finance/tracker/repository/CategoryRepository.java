package com.finance.tracker.repository;

import com.finance.tracker.model.Category;
import com.finance.tracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    // Fetch all categories for a specific user
    List<Category> findByUser(User user);

    // Fetch a specific category by its ID (Optional to handle not found)
    Optional<Category> findById(Long categoryId);
}
