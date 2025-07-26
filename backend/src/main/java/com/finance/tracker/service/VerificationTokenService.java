package com.finance.tracker.service;

import com.finance.tracker.model.User;
import com.finance.tracker.model.VerificationToken;
import com.finance.tracker.repository.UserRepository;
import com.finance.tracker.repository.VerificationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // ✅ Add this
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional // ✅ Ensures DB changes (update & delete) are committed
public class VerificationTokenService {

    private final VerificationTokenRepository tokenRepository;
    private final UserRepository userRepository;

    public boolean verifyToken(String token) {
        System.out.println("Received token: " + token);  // 👈 Debug log
        return tokenRepository.findByToken(token)
                .filter(verificationToken -> {
                    System.out.println("Found token: " + verificationToken.getToken()); // 👈 Debug log
                    return verificationToken.getExpiryDate().isAfter(LocalDateTime.now());
                })
                .map(verificationToken -> {
                    User user = verificationToken.getUser();
                    if (user == null) {
                        System.out.println("No user found for token");
                        return false;
                    }

                    user.setEmailVerified(true);
                    userRepository.save(user);
                    tokenRepository.delete(verificationToken);
                    return true;
                })
                .orElse(false);
    }
}
