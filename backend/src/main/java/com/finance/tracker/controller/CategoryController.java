package com.finance.tracker.controller;

import com.finance.tracker.dto.CategoryDto;
import com.finance.tracker.model.Category;
import com.finance.tracker.model.User;
import com.finance.tracker.repository.UserRepository;
import com.finance.tracker.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final UserRepository userRepository;

    // GET /api/categories
    @GetMapping
    public List<CategoryDto> getCategories(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();

        return categoryService.getCategories(user).stream()
                .map(CategoryDto::fromEntity)
                .collect(Collectors.toList());
    }

    // POST /api/categories
    @PostMapping
    public CategoryDto create(@RequestBody CategoryDto dto, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();

        Category category = Category.builder()
                .name(dto.getName())
                .user(user)
                .build();

        Category saved = categoryService.addCategory(category);
        return CategoryDto.fromEntity(saved);
    }

    // PUT /api/categories/{id}
    @PutMapping("/{id}")
    public CategoryDto update(@PathVariable Long id, @RequestBody CategoryDto dto, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();

        Category updated = categoryService.updateCategory(id, dto.getName(), user);
        return CategoryDto.fromEntity(updated);
    }

    // DELETE /api/categories/{id}
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        categoryService.deleteCategory(id, user);
    }
}
