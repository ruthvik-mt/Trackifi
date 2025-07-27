package com.finance.tracker.service;

import com.finance.tracker.dto.*;
import com.finance.tracker.model.*;
import com.finance.tracker.repository.*;
import com.finance.tracker.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final VerificationTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final UserDetailsService userDetailsService;
    private final EmailService emailService;

    private final RefreshTokenService refreshTokenService;  // <--- inject this

    @Value("${frontend.url}")
    private String baseUrl;

    /**
     * Registers a new user and sends a verification email.
     */
    @Transactional
    public AuthenticationResponse register(RegisterRequest request) {
        if (isNullOrEmpty(request.getEmail()) || isNullOrEmpty(request.getPassword()) || isNullOrEmpty(request.getFullName())) {
            throw new IllegalArgumentException("Email, password, and full name must not be blank.");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("User already exists with this email.");
        }

        User user = User.builder()
                .email(request.getEmail())
                .fullName(request.getFullName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .emailVerified(false)
                .build();

        userRepository.save(user);

        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = VerificationToken.builder()
                .token(token)
                .user(user)
                .expiryDate(LocalDateTime.now().plusHours(24))
                .build();

        tokenRepository.save(verificationToken);

        String verifyUrl = baseUrl + "/verify-email?token=" + token;

        emailService.sendSimpleEmail(
                user.getEmail(),
                "Verify your email",
                "Hi " + user.getFullName() + ",\n\nPlease verify your account by clicking the link below:\n" + verifyUrl + "\n\nThis link will expire in 24 hours."
        );

        return new AuthenticationResponse("Registration successful. Please verify your email.");
    }

    /**
     * Verifies the token sent via email for email confirmation.
     */
    @Transactional
    public String verifyToken(String token) {
        Optional<VerificationToken> optionalToken = tokenRepository.findByToken(token);

        if (optionalToken.isEmpty()) {
            return "Invalid or expired verification token.";
        }

        VerificationToken verificationToken = optionalToken.get();

        if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            tokenRepository.delete(verificationToken);
            return "Verification token has expired.";
        }

        User user = verificationToken.getUser();
        user.setEmailVerified(true);
        userRepository.save(user);
        tokenRepository.delete(verificationToken);

        return "Email verified successfully.";
    }

    /**
     * Authenticates the user and returns access and refresh tokens.
     */
    public AuthenticationResponse login(AuthenticationRequest request) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Invalid email or password.");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found."));

        if (!user.isEmailVerified()) {
            throw new RuntimeException("Email not verified. Please check your inbox.");
        }

        String accessToken = jwtService.generateToken(user);

        // CREATE & SAVE refresh token in DB
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());
        String refreshTokenStr = refreshToken.getToken();

        return new AuthenticationResponse(accessToken, refreshTokenStr, "Login successful.");
    }

    /**
     * Refreshes the access token using a valid refresh token.
     */
    public AuthenticationResponse refreshToken(String refreshTokenStr) {
        if (isNullOrEmpty(refreshTokenStr)) {
            throw new IllegalArgumentException("Refresh token is required.");
        }

        // Validate token exists in DB and is not expired
        RefreshToken refreshToken = refreshTokenService.findByToken(refreshTokenStr)
                .orElseThrow(() -> new RuntimeException("Refresh token not found. Please login again."));

        refreshTokenService.verifyExpiration(refreshToken);

        User user = refreshToken.getUser();

        String newAccessToken = jwtService.generateToken(user);

        // OPTIONAL: create a new refresh token on refresh and delete the old one,
        // or reuse existing token. Here, let's create a new one and delete old.

        refreshTokenService.deleteByUserId(user.getId());
        RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(user.getId());

        return new AuthenticationResponse(newAccessToken, newRefreshToken.getToken(), "Token refreshed.");
    }

    private boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }
}