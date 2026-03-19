package com.finance.tracker.controller;

import com.finance.tracker.dto.DashboardSummaryResponse;
import com.finance.tracker.dto.SpendingTrendPoint;
import com.finance.tracker.model.User;
import com.finance.tracker.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    /** GET /api/dashboard/summary - returns totalSpent, budgets, categories */
    @GetMapping("/summary")
    public DashboardSummaryResponse getSummary(@AuthenticationPrincipal User user) {
        return dashboardService.getDashboardSummary(user.getId());
    }

    /** GET /api/dashboard/spending-trends - returns line chart data */
    @GetMapping("/spending-trends")
    public List<SpendingTrendPoint> getTrends(@AuthenticationPrincipal User user) {
        return dashboardService.getSpendingTrends(user.getId());
    }
}
