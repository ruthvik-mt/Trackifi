package com.finance.tracker.controller;

import com.finance.tracker.dto.TransactionDto;
import com.finance.tracker.model.Category;
import com.finance.tracker.model.Transaction;
import com.finance.tracker.model.User;
import com.finance.tracker.repository.CategoryRepository;
import com.finance.tracker.repository.UserRepository;
import com.finance.tracker.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    /* ───────────────────────── GET  /api/transactions ───────────────────────── */
    @GetMapping
    public List<TransactionDto> getAll(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        return transactionService.getUserTransactions(user)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    /* ───────────────────────── POST /api/transactions ───────────────────────── */
    @PostMapping
    public TransactionDto create(@RequestBody TransactionDto dto, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        Category category = categoryRepository.findById(dto.getCategoryId()).orElse(null); // may be null

        Transaction saved = transactionService.createTransaction(
                Transaction.builder()
                        .amount(dto.getAmount())
                        .description(dto.getDescription())
                        .date(dto.getDate())
                        .category(category)
                        .user(user)
                        .build()
        );

        return mapToDto(saved);
    }

    /* ───────────────────────── PUT  /api/transactions/{id} ───────────────────── */
    @PutMapping("/{id}")
    public TransactionDto update(@PathVariable Long id,
                                 @RequestBody TransactionDto dto,
                                 Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        Category category = categoryRepository.findById(dto.getCategoryId()).orElse(null); // may be null

        Transaction toUpdate = Transaction.builder()
                .amount(dto.getAmount())
                .description(dto.getDescription())
                .date(dto.getDate())
                .category(category)
                .user(user)
                .build();

        Transaction saved = transactionService.update(id, toUpdate, user);
        return mapToDto(saved);
    }

    /* ───────────────────────── DELETE /api/transactions/{id} ─────────────────── */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        transactionService.delete(id, user);
    }

    /* ───────────────────────── Helper: Entity ➜ DTO  ─────────────────────────── */
    private TransactionDto mapToDto(Transaction t) {
        TransactionDto.TransactionDtoBuilder builder = TransactionDto.builder()
                .id(t.getId())
                .amount(t.getAmount())
                .description(t.getDescription())
                .date(t.getDate());

        // Handle category null case
        if (t.getCategory() != null) {
            builder.categoryId(t.getCategory().getId());
            builder.categoryName(t.getCategory().getName());
        } else {
            builder.categoryId(null);
            builder.categoryName("Uncategorized");
        }

        return builder.build();
    }
}
