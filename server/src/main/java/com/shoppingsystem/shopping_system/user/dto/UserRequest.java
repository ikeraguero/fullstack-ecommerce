package com.shoppingsystem.shopping_system.user.dto;

import lombok.Data;

@Data
public class UserRequest {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private int roleId;
}
