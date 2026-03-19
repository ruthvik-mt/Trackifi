package com.finance.tracker.dto;

import com.finance.tracker.model.Category;
import lombok.Data;

@Data
public class CategoryDto {
    private Long id;
    private String name;

    // Static converter
    public static CategoryDto fromEntity(Category category) {
        CategoryDto dto = new CategoryDto();
        dto.setId(category.getId());
        dto.setName(category.getName());
        return dto;
    }
}
