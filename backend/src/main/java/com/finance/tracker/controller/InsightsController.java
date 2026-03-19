package com.finance.tracker.controller;

import com.finance.tracker.model.*;
import com.finance.tracker.repository.*;
import com.finance.tracker.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
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

    // Total expenses for month
    @GetMapping("/monthly-total")
    @Transactional(readOnly = true)
    public BigDecimal getMonthlyTotal(@RequestParam String month, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        YearMonth ym = YearMonth.parse(month);
        return transactionService.getMonthlyTransactions(user, ym).stream()
                .filter(t -> t.getAmount() != null)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // Category-wise expenses (for pie chart)
    @GetMapping("/category-breakdown")
    @Transactional(readOnly = true)
    public Map<String, BigDecimal> getCategoryBreakdown(@RequestParam String month, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        YearMonth ym = YearMonth.parse(month);
        List<Transaction> transactions = transactionService.getMonthlyTransactions(user, ym);

        return transactions.stream()
                .filter(t -> t.getCategory() != null && t.getAmount() != null)
                .collect(Collectors.groupingBy(
                        t -> t.getCategory().getName(),
                        Collectors.reducing(BigDecimal.ZERO, Transaction::getAmount, BigDecimal::add)
                ));
    }

    // Budget vs Actual for each category
    @GetMapping("/budget-comparison")
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getBudgetComparison(@RequestParam String month, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        YearMonth ym = YearMonth.parse(month);
        List<Transaction> transactions = transactionService.getMonthlyTransactions(user, ym);
        List<Category> categories = categoryRepository.findByUser(user);

        Map<Long, BigDecimal> actualMap = transactions.stream()
                .filter(t -> t.getCategory() != null && t.getAmount() != null)
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

    // NEW: All-time total spending
    @GetMapping("/all-time-total")
    @Transactional(readOnly = true)
    public BigDecimal getAllTimeTotal(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        return transactionService.getUserTransactions(user).stream()
                .filter(t -> t.getAmount() != null)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // NEW: All-time category breakdown
    @GetMapping("/all-time-category-breakdown")
    @Transactional(readOnly = true)
    public Map<String, BigDecimal> getAllTimeCategoryBreakdown(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        List<Transaction> transactions = transactionService.getUserTransactions(user);

        return transactions.stream()
                .filter(t -> t.getCategory() != null && t.getAmount() != null)
                .collect(Collectors.groupingBy(
                        t -> t.getCategory().getName(),
                        Collectors.reducing(BigDecimal.ZERO, Transaction::getAmount, BigDecimal::add)
                ));
    }

    // NEW: All-time monthly trend
    @GetMapping("/all-time-monthly-trend")
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getAllTimeMonthlyTrend(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        List<Transaction> transactions = transactionService.getUserTransactions(user);

        Map<YearMonth, BigDecimal> trendMap = transactions.stream()
                .filter(t -> t.getDate() != null && t.getAmount() != null)
                .collect(Collectors.groupingBy(
                        t -> YearMonth.from(t.getDate()),
                        TreeMap::new,
                        Collectors.reducing(BigDecimal.ZERO, Transaction::getAmount, BigDecimal::add)
                ));

        return trendMap.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> dataPoint = new HashMap<>();
                    dataPoint.put("month", entry.getKey().toString());
                    dataPoint.put("total", entry.getValue());
                    return dataPoint;
                })
                .collect(Collectors.toList());
    }

    // NEW: All-time budget comparison
    @GetMapping("/all-time-budget-comparison")
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getAllTimeBudgetComparison(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        List<Transaction> transactions = transactionService.getUserTransactions(user);
        List<Budget> budgets = budgetRepository.findByUser(user);
        List<Category> categories = categoryRepository.findByUser(user);

        Map<Long, BigDecimal> actualMap = transactions.stream()
                .filter(t -> t.getCategory() != null && t.getAmount() != null)
                .collect(Collectors.groupingBy(
                        t -> t.getCategory().getId(),
                        Collectors.reducing(BigDecimal.ZERO, Transaction::getAmount, BigDecimal::add)
                ));

        Map<Long, BigDecimal> budgetMap = budgets.stream()
                .filter(b -> b.getCategory() != null && b.getLimitAmount() != null)
                .collect(Collectors.groupingBy(
                        b -> b.getCategory().getId(),
                        Collectors.reducing(BigDecimal.ZERO, Budget::getLimitAmount, BigDecimal::add)
                ));

        return categories.stream().map(category -> {
            Map<String, Object> item = new HashMap<>();
            item.put("category", category.getName());
            item.put("actual", actualMap.getOrDefault(category.getId(), BigDecimal.ZERO));
            item.put("budget", budgetMap.getOrDefault(category.getId(), BigDecimal.ZERO));
            return item;
        }).collect(Collectors.toList());
    }
}
