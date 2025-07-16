package com.finance.tracker.util;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.sql.Date;
import java.time.YearMonth;

/**
 * JPA Converter to persist {@link YearMonth} as SQL {@link Date}.
 * Only the first day of the month is stored.
 */
@Converter(autoApply = false) // Use explicitly where needed (e.g., on @Convert fields)
public class YearMonthAttributeConverter implements AttributeConverter<YearMonth, Date> {

    @Override
    public Date convertToDatabaseColumn(YearMonth yearMonth) {
        return (yearMonth != null) ? Date.valueOf(yearMonth.atDay(1)) : null;
    }

    @Override
    public YearMonth convertToEntityAttribute(Date date) {
        return (date != null) ? YearMonth.from(date.toLocalDate()) : null;
    }
}
