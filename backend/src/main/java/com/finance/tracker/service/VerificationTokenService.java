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
        return tokenRepository.findByToken(token)
                .filter(verificationToken -> verificationToken.getExpiryDate().isAfter(LocalDateTime.now()))
                .map(verificationToken -> {
                    User user = verificationToken.getUser();
                    if (user == null) return false;

                    user.setEmailVerified(true);                // ✅ Update user
                    userRepository.save(user);                  // ✅ Save updated user
                    tokenRepository.delete(verificationToken);  // ✅ Delete used token
                    return true;
                })
                .orElse(false); // Invalid or expired token
    }
}
