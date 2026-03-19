package com.finance.tracker.controller;

import com.finance.tracker.dto.BudgetDto;
import com.finance.tracker.dto.BudgetResponseDto;
import com.finance.tracker.model.Budget;
import com.finance.tracker.model.Category;
import com.finance.tracker.model.User;
import com.finance.tracker.repository.CategoryRepository;
import com.finance.tracker.repository.UserRepository;
import com.finance.tracker.service.BudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/budgets")
@RequiredArgsConstructor
public class BudgetController {

    private final BudgetService budgetService;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @PostMapping
    public BudgetResponseDto setBudget(@RequestBody BudgetDto dto, Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Budget budget = Budget.builder()
                .limitAmount(dto.getLimitAmount())
                .month(dto.getMonth())
                .category(category)
                .user(user)
                .build();

        Budget saved = budgetService.setBudget(budget);
        return toDto(saved);
    }

    @GetMapping
    public BudgetResponseDto getBudget(@RequestParam Long categoryId,
                                       @RequestParam String month,
                                       Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        return budgetService.getBudget(user, category, YearMonth.parse(month))
                .map(this::toDto)
                .orElse(null);
    }

    @GetMapping("/all")
    public List<BudgetResponseDto> getAllBudgets(Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return budgetService.getAllBudgets(user)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }


    @PutMapping("/{id}")
    public BudgetResponseDto updateBudget(@PathVariable Long id,
                                          @RequestBody BudgetDto dto,
                                          Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Budget updated = Budget.builder()
                .limitAmount(dto.getLimitAmount())
                .month(dto.getMonth())
                .category(category)
                .user(user)
                .build();

        return toDto(budgetService.updateBudget(id, updated, user));
    }

    @DeleteMapping("/{id}")
    public void deleteBudget(@PathVariable Long id, Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        budgetService.deleteBudget(id, user);
    }

    // --- private mapper method ---
    private BudgetResponseDto toDto(Budget budget) {
        BudgetResponseDto dto = new BudgetResponseDto();
        dto.setId(budget.getId());
        dto.setLimitAmount(budget.getLimitAmount());
        dto.setMonth(budget.getMonth());
        dto.setCategoryId(budget.getCategory().getId());
        dto.setCategoryName(budget.getCategory().getName());
        return dto;
    }
}
