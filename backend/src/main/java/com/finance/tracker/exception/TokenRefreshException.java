package com.finance.tracker.exception;

/**
 * Custom exception used when a refresh token fails validation or processing.
 */
public class TokenRefreshException extends RuntimeException {

    private static final long serialVersionUID = 1L; 

    public TokenRefreshException(String message) {
        super(message);
    }

    public TokenRefreshException(String message, Throwable cause) {
        super(message, cause);
    }
}
