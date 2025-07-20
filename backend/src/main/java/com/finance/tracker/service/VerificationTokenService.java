package com.finance.tracker.service;

import com.finance.tracker.model.User;
import com.finance.tracker.model.VerificationToken;
import com.finance.tracker.repository.UserRepository;
import com.finance.tracker.repository.VerificationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VerificationTokenService {

    private final VerificationTokenRepository tokenRepository;
    private final UserRepository userRepository;

    public String createTokenForUser(User user) {
        String token = UUID.randomUUID().toString();

        VerificationToken verificationToken = VerificationToken.builder()
                .token(token)
                .user(user)
                .expiryDate(LocalDateTime.now().plusHours(24)) // 24 hour expiry
                .build();

        tokenRepository.save(verificationToken);
        return token;
    }

    public boolean verifyToken(String token) {
        return tokenRepository.findByToken(token).map(t -> {
            if (t.getExpiryDate().isBefore(LocalDateTime.now())) {
                return false;
            }

            User user = t.getUser();
            user.setEmailVerified(true);
            userRepository.save(user);
            tokenRepository.delete(t);
            return true;
        }).orElse(false);
    }
}
