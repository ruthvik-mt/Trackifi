package com.finance.tracker.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.YearMonth;

@Data
public class BudgetDto {
    private Long id;
    private Long categoryId;
    private BigDecimal limitAmount;
    private YearMonth month;
}
