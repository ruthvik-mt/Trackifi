package com.finance.tracker.model;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    USER,
    ADMIN;

    @Override
    public String getAuthority() {
        return "ROLE_" + name(); // returns "ROLE_USER", "ROLE_ADMIN"
    }
}
