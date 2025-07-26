package com.finance.tracker.service;

import com.finance.tracker.model.VerificationToken;
import com.finance.tracker.repository.VerificationTokenRepository;
import com.finance.tracker.model.User;
import com.finance.tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class VerificationTokenService {

    private final VerificationTokenRepository tokenRepository;
    private final UserRepository userRepository;

    public boolean verifyToken(String token) {
        return tokenRepository.findByToken(token)
                .filter(verificationToken -> verificationToken.getExpiryDate().isAfter(LocalDateTime.now()))
                .map(verificationToken -> {
                    User user = verificationToken.getUser();
                    if (user == null) return false;

                    user.setEmailVerified(true);
                    userRepository.save(user);
                    tokenRepository.delete(verificationToken);
                    return true;
                })
                .orElse(false);
    }
}
