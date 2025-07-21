package com.finance.tracker.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RegisterRequest {
    @JsonProperty("fullName")
    private String fullName;

    private String email;
    private String password;
}
