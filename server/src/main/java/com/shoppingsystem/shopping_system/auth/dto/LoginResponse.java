package com.shoppingsystem.shopping_system.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
}

