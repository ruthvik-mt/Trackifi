package com.finance.tracker.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
public class TransactionDto {
    private Long id;
    private BigDecimal amount;
    private String description;
    private LocalDate date;
    private Long categoryId;
    private String categoryName;
    private UUID userId; // ✅ Only if needed in response
}
