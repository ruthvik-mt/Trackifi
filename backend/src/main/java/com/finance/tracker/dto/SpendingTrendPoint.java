package com.finance.tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SpendingTrendPoint {
    private String date;  // Format: YYYY-MM-DD
    private double amount;
}
