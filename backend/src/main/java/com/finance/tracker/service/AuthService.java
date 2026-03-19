package com.finance.tracker.service;

import com.finance.tracker.dto.*;
import com.finance.tracker.model.*;
import com.finance.tracker.repository.*;
import com.finance.tracker.security.JwtService;
import com.finance.tracker.util.EmailValidator;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
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
    private final EmailService emailService;
    private final RefreshTokenService refreshTokenService;

    @Value("${auth.auto-verify:false}")
    private boolean autoVerify;

    @Value("${frontend.url}")
    private String baseUrl;

    @Transactional
    public AuthenticationResponse register(RegisterRequest request) {
        if (isNullOrEmpty(request.getEmail()) || isNullOrEmpty(request.getPassword()) || isNullOrEmpty(request.getFullName())) {
            throw new IllegalArgumentException("Email, password, and full name must not be blank.");
        }

        if (EmailValidator.isDisposable(request.getEmail())) {
            throw new IllegalArgumentException("Disposable or dummy emails are not allowed.");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("User already exists with this email.");
        }

        User user = User.builder()
                .email(request.getEmail())
                .fullName(request.getFullName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .emailVerified(autoVerify)
                .build();

        userRepository.save(user);

        if (!autoVerify) {
            String token = UUID.randomUUID().toString();
            VerificationToken verificationToken = VerificationToken.builder()
                    .token(token)
                    .user(user)
                    .expiryDate(LocalDateTime.now().plusHours(24))
                    .build();

            tokenRepository.save(verificationToken);

            String cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.substring(0, baseUrl.length() - 1) : baseUrl;
            String verifyUrl = cleanBaseUrl + "/verify-email?token=" + token;

            String htmlTemplate = "<div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eaeaea; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);\">" +
                    "<h2 style=\"color: #2563eb; text-align: center; font-size: 24px; margin-bottom: 20px;\">Welcome to Trackifi!</h2>" +
                    "<p style=\"color: #333333; text-align: center; font-size: 16px; line-height: 1.5; margin-bottom: 30px;\">" +
                    "Hi <strong>%s</strong>,<br/><br/>" +
                    "To complete your registration and secure your account, please verify your email address by clicking the button below:" +
                    "</p>" +
                    "<div style=\"text-align: center; margin: 40px 0;\">" +
                    "<a href=\"%s\" style=\"background-color: #2563eb; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);\">Verify Email Address</a>" +
                    "</div>" +
                    "<p style=\"color: #777777; font-size: 13px; text-align: center; margin-top: 30px;\">" +
                    "This link will expire in 24 hours. If you didn't request this, you can safely ignore this email." +
                    "</p>" +
                    "<hr style=\"border: none; border-top: 1px solid #eaeaea; margin: 30px 0;\" />" +
                    "<p style=\"color: #999999; font-size: 11px; text-align: center;\">" +
                    "&copy; 2026 Trackifi. All rights reserved." +
                    "</p>" +
                    "</div>";

            String htmlBody = String.format(htmlTemplate, user.getFullName(), verifyUrl);

            emailService.sendHtmlEmail(
                    user.getEmail(),
                    "Verify your Trackifi account",
                    htmlBody
            );
        }

        return new AuthenticationResponse(autoVerify ? "Registration successful. You can now log in." : "Registration successful. Please verify your email.");
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

    @Transactional
    public void deleteAccount(User user, HttpServletResponse response) {
        // Delete refresh token manually (not cascaded in model)
        refreshTokenService.deleteByUserId(user.getId());

        // Delete the user (cascades handle Transactions, Budgets, etc.)
        userRepository.delete(user);

        // Clear refresh token cookie
        ResponseCookie cookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("None")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
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
