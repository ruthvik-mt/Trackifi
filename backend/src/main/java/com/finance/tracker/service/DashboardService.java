package com.finance.tracker.service;

import com.finance.tracker.dto.DashboardSummaryResponse;
import com.finance.tracker.dto.SpendingTrendPoint;
import com.finance.tracker.repository.BudgetRepository;
import com.finance.tracker.repository.CategoryRepository;
import com.finance.tracker.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date; // ✅ Important for native query DATE results
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final TransactionRepository transactionRepository;
    private final BudgetRepository budgetRepository;
    private final CategoryRepository categoryRepository;

    /** Fetch total spent, active budgets and category count */
    public DashboardSummaryResponse getDashboardSummary(UUID userId) {
        double totalSpent = transactionRepository.sumAmountByUserId(userId);
        int activeBudgets = budgetRepository.countByUserId(userId);
        int categories = categoryRepository.countByUserId(userId);

        return new DashboardSummaryResponse(totalSpent, activeBudgets, categories);
    }

    /** Fetch daily spending trend data */
    public List<SpendingTrendPoint> getSpendingTrends(UUID userId) {
        List<Object[]> results = transactionRepository.sumByDate(userId);

        return results.stream()
                .filter(row -> row[0] != null && row[1] != null) // ✅ skip nulls
                .map(row -> new SpendingTrendPoint(
                        ((Date) row[0]).toLocalDate().toString(),  // ✅ Convert java.sql.Date to LocalDate
                        ((Number) row[1]).doubleValue()
                ))
                .collect(Collectors.toList());
    }
}
