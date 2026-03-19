package com.finance.tracker.controller;

import com.finance.tracker.dto.UserProfileDto;
import com.finance.tracker.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.finance.tracker.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;

/**
 * User‑related endpoints (profile, settings, etc.).
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final AuthService authService;

    /**
     * Return the profile of the currently authenticated user.
     * JWT authentication is handled by Spring Security,
     * so we simply inject the User object with @AuthenticationPrincipal.
     */
    @GetMapping("/me")
    public ResponseEntity<UserProfileDto> getCurrentUser(@AuthenticationPrincipal User user) {
        UserProfileDto dto = new UserProfileDto(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getRole()
        );
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteAccount(
            @AuthenticationPrincipal User user,
            HttpServletResponse response) {
        authService.deleteAccount(user, response);
        return ResponseEntity.noContent().build();
    }
}
