package com.finance.tracker.repository;

import com.finance.tracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    // ✅ Checks if a user with the given email already exists
    boolean existsByEmail(String email);
}
