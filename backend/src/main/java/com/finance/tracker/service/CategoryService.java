package com.finance.tracker.service;

import com.finance.tracker.model.Category;
import com.finance.tracker.model.User;
import com.finance.tracker.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    /** Get all categories for a specific user. */
    public List<Category> getCategories(User user) {
        return categoryRepository.findByUser(user);
    }

    /** Add (or save) a new category for a user. */
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    /** Update category name if it belongs to the given user. */
    public Category updateCategory(Long id, String newName, User user) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Category not found with ID: " + id));

        if (!category.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Unauthorized to update this category.");
        }

        category.setName(newName);
        return categoryRepository.save(category);
    }

    /** Delete category only if it belongs to the user. */
    public void deleteCategory(Long id, User user) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Category not found with ID: " + id));

        if (!category.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Unauthorized to delete this category.");
        }

        categoryRepository.delete(category);
    }
}
