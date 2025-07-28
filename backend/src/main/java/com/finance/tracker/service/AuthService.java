package com.finance.tracker.service;

import com.finance.tracker.dto.*;
import com.finance.tracker.model.*;
import com.finance.tracker.repository.*;
import com.finance.tracker.security.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
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
    private final RefreshTokenService refreshTokenService;

    @Value("${frontend.url}")
    private String baseUrl;

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

    public AuthenticationResponse login(AuthenticationRequest request, HttpServletResponse response) {
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

        // CREATE refresh token in DB
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

        // SET refresh token in HttpOnly cookie
        addRefreshTokenToCookie(refreshToken.getToken(), response);

        return new AuthenticationResponse(accessToken, null, "Login successful.");
    }

    public AuthenticationResponse refreshToken(String refreshTokenStr, HttpServletResponse response) {
        if (isNullOrEmpty(refreshTokenStr)) {
            throw new IllegalArgumentException("Refresh token is required.");
        }

        RefreshToken refreshToken = refreshTokenService.findByToken(refreshTokenStr)
                .orElseThrow(() -> new RuntimeException("Refresh token not found. Please login again."));

        refreshTokenService.verifyExpiration(refreshToken);
        User user = refreshToken.getUser();

        String newAccessToken = jwtService.generateToken(user);

        // Replace the refresh token in DB and cookie
        refreshTokenService.deleteByUserId(user.getId());
        RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(user.getId());
        addRefreshTokenToCookie(newRefreshToken.getToken(), response);

        return new AuthenticationResponse(newAccessToken, null, "Token refreshed.");
    }

    private void addRefreshTokenToCookie(String token, HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", token)
                .httpOnly(true)
                .secure(true) // Set to false if not using HTTPS during local testing
                .path("/")
                .sameSite("None")
                .maxAge(Duration.ofDays(7))
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    private boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }
}
