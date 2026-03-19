package com.finance.tracker.security;

import com.finance.tracker.model.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Slf4j
public class JwtService {

    @Value("${JWT_SECRET}")
    private String jwtSecret;

    @Value("${JWT_ACCESS_TOKEN_EXPIRATION}")
    private String jwtAccessTokenExpirationStr;

    @Value("${JWT_REFRESH_TOKEN_EXPIRATION}")
    private String jwtRefreshTokenExpirationStr;

    private Key key;
    private long jwtAccessExpiration;
    private long jwtRefreshExpiration;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        this.jwtAccessExpiration = parseDuration(jwtAccessTokenExpirationStr);
        this.jwtRefreshExpiration = parseDuration(jwtRefreshTokenExpirationStr);
    }

    public String generateToken(UserDetails userDetails) {
        String role = userDetails.getAuthorities().stream()
                .findFirst()
                .map(Object::toString)
                .orElse("ROLE_USER");

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtAccessExpiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtRefreshExpiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            String username = extractUsername(token);
            return username != null && username.equals(userDetails.getUsername()) && !isTokenExpired(token);
        } catch (JwtException | IllegalArgumentException e) {
            log.warn("Invalid JWT token: {}", e.getMessage());
            return false;
        }
    }

    public String extractUsername(String token) {
        try {
            return parseToken(token).getBody().getSubject();
        } catch (JwtException e) {
            log.warn("Failed to extract username from token: {}", e.getMessage());
            return null;
        }
    }

    public boolean isTokenExpired(String token) {
        try {
            return parseToken(token).getBody().getExpiration().before(new Date());
        } catch (JwtException e) {
            log.warn("Failed to check token expiration: {}", e.getMessage());
            return true;
        }
    }

    public Jws<Claims> parseToken(String token) {
        if (token == null || token.chars().filter(ch -> ch == '.').count() != 2) {
            throw new MalformedJwtException("Invalid JWT format: must contain exactly 2 periods");
        }

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
    }

    private long parseDuration(String duration) {
        Pattern pattern = Pattern.compile("(\\d+)([smhd])");
        Matcher matcher = pattern.matcher(duration.toLowerCase());

        if (matcher.matches()) {
            long value = Long.parseLong(matcher.group(1));
            String unit = matcher.group(2);

            return switch (unit) {
                case "s" -> value * 1000;
                case "m" -> value * 60 * 1000;
                case "h" -> value * 60 * 60 * 1000;
                case "d" -> value * 24 * 60 * 60 * 1000;
                default -> throw new IllegalArgumentException("Invalid time unit: " + unit);
            };
        } else {
            throw new IllegalArgumentException("Invalid duration format: " + duration);
        }
    }
}
