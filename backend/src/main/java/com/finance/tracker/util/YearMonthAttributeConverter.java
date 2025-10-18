package com.finance.tracker.util;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.sql.Date;
import java.time.YearMonth;

@Converter(autoApply = false) 
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
