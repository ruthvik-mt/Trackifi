package com.finance.tracker.service;

import com.finance.tracker.model.Budget;
import com.finance.tracker.model.Category;
import com.finance.tracker.model.User;
import com.finance.tracker.repository.BudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepository;

    /**
     * Set or update the budget for a user, category, and month.
     */
    public Budget setBudget(Budget budget) {
        return budgetRepository
                .findByUserAndCategoryAndMonth(budget.getUser(), budget.getCategory(), budget.getMonth())
                .map(existing -> {
                    existing.setLimitAmount(budget.getLimitAmount());
                    return budgetRepository.save(existing);
                })
                .orElseGet(() -> budgetRepository.save(budget));
    }

    /**
     * Retrieve a budget for a specific user, category, and month.
     */
    public Optional<Budget> getBudget(User user, Category category, YearMonth month) {
        return budgetRepository.findByUserAndCategoryAndMonth(user, category, month);
    }

    /**
     * Get all budgets for the current user.
     */
    public List<Budget> getAllBudgets(User user) {
        return budgetRepository.findByUser(user);
    }

    /**
     * Update a specific budget by ID, only if it belongs to the user.
     */
    public Budget updateBudget(Long id, Budget updatedBudget, User user) {
        Budget existing = budgetRepository.findById(id)
                .filter(b -> b.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Budget not found or access denied"));

        existing.setLimitAmount(updatedBudget.getLimitAmount());
        existing.setMonth(updatedBudget.getMonth());
        existing.setCategory(updatedBudget.getCategory());

        return budgetRepository.save(existing);
    }

    /**
     * Delete a budget by ID, only if it belongs to the user.
     */
    public void deleteBudget(Long id, User user) {
        Budget existing = budgetRepository.findById(id)
                .filter(b -> b.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Budget not found or access denied"));

        budgetRepository.delete(existing);
    }
}
