package com.finance.tracker.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.YearMonth;

@Data
public class BudgetResponseDto {
    private Long id;
    private BigDecimal limitAmount;
    private YearMonth month;
    private Long categoryId;
    private String categoryName;
}
