package com.finance.tracker.util;

import java.util.Set;

public class EmailValidator {

    private static final Set<String> DISPOSABLE_DOMAINS = Set.of(
            "yopmail.com",
            "tempmail.com",
            "temp-mail.org",
            "guerrillamail.com",
            "mailinator.com",
            "dispostable.com",
            "burnermail.io",
            "10minutemail.com",
            "trashmail.com"
    );

    public static boolean isDisposable(String email) {
        if (email == null || !email.contains("@")) {
            return false;
        }
        String domain = email.substring(email.lastIndexOf("@") + 1).toLowerCase();
        return DISPOSABLE_DOMAINS.contains(domain);
    }
}
