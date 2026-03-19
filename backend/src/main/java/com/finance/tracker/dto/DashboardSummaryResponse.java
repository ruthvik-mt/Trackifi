package com.finance.tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardSummaryResponse {
    private double totalSpent;
    private int activeBudgets;
    private int categories;
}
