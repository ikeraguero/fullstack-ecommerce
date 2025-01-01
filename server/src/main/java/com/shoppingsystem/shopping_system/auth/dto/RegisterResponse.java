package com.shoppingsystem.shopping_system.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterResponse {
    private Long id;
    private String token;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
}
