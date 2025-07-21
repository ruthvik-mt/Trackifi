package com.finance.tracker.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Indexed token column (performance improvement)
    @Column(nullable = false, unique = true)
    private String token;

    // Cascade and orphan removal to auto-delete refresh token with user
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    // Add this field:
    @Column(nullable = false)
    private Instant expiryDate;
}
