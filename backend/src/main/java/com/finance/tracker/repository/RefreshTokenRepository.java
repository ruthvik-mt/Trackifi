package com.finance.tracker.repository;

import com.finance.tracker.model.RefreshToken;
import com.finance.tracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);

    Optional<RefreshToken> findByUser(User user);  // <-- Added method

    int deleteByUser(User user); // Used for cascade cleanup if needed explicitly
}
