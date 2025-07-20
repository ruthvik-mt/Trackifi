package com.finance.tracker.model;

import com.finance.tracker.util.YearMonthAttributeConverter;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal limitAmount;

    @Convert(converter = YearMonthAttributeConverter.class)
    private YearMonth month;

    @ManyToOne
    @JoinColumn(
            name = "category_id",
            nullable = true,
            foreignKey = @ForeignKey(name = "fk_budget_category")
    )
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Category category;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE) // ✅ VERY IMPORTANT
    private User user;
}
