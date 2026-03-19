package com.finance.tracker.service;

import com.finance.tracker.exception.TokenRefreshException;
import com.finance.tracker.model.RefreshToken;
import com.finance.tracker.repository.RefreshTokenRepository;
import com.finance.tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    @Value("${app.jwt.refreshExpirationMs:86400000}") // 1 day
    private Long refreshTokenDurationMs;

    public RefreshToken createRefreshToken(UUID userId) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Delete existing token if present (because of @OneToOne mapping)
        refreshTokenRepository.findByUser(user).ifPresent(refreshTokenRepository::delete);

        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(refreshTokenDurationMs))
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException("Refresh token expired. Please log in again.");
        }
        return token;
    }

    public int deleteByUserId(UUID userId) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        return refreshTokenRepository.deleteByUser(user);
    }
}
