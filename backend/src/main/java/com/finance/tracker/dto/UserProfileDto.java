package com.finance.tracker.dto;

import com.finance.tracker.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class UserProfileDto {
    private UUID id;
    private String email;
    private String fullName;
    private Role role;
}
