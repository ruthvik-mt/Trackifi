package com.finance.tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SpendingTrendPoint {
    private String date;  
    private double amount;
}
