package com.finance.tracker.service;

import com.finance.tracker.dto.*;
import com.finance.tracker.model.*;
import com.finance.tracker.repository.*;
import com.finance.tracker.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    /** User Registration with Email Verification */
    public AuthenticationResponse register(RegisterRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()
                || request.getPassword() == null || request.getPassword().isBlank()
                || request.getFullName() == null || request.getFullName().isBlank()) {
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

        // Generate verification token
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = VerificationToken.builder()
                .token(token)
                .user(user)
                .expiryDate(LocalDateTime.now().plusHours(24))
                .build();
        tokenRepository.save(verificationToken);

        // Send email
        String verifyUrl = "http://localhost:8080/api/auth/verify?token=" + token;
        emailService.sendSimpleEmail(
                user.getEmail(),
                "Verify your email",
                "Click the link to verify your account: " + verifyUrl
        );

        return new AuthenticationResponse("Registration successful. Please verify your email.");
    }

    /** Email verification handler */
    public String verifyEmail(String token) {
        VerificationToken verificationToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid verification token."));

        if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Verification token has expired.");
        }

        User user = verificationToken.getUser();
        user.setEmailVerified(true);
        userRepository.save(user);

        tokenRepository.delete(verificationToken); // Optional: remove token after use

        return "Email verified successfully. You can now log in.";
    }

    /** Login - only if email is verified */
    public AuthenticationResponse login(AuthenticationRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isEmailVerified()) {
            throw new RuntimeException("Email not verified. Please check your inbox.");
        }

        String token = jwtService.generateToken(user);
        return new AuthenticationResponse(token);
    }
}
