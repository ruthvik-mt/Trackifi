package com.finance.tracker.exception;

import com.finance.tracker.dto.AuthenticationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<AuthenticationResponse> handleRuntimeException(RuntimeException e) {
        return ResponseEntity.badRequest().body(new AuthenticationResponse(e.getMessage()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<AuthenticationResponse> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(new AuthenticationResponse(e.getMessage()));
    }
}
