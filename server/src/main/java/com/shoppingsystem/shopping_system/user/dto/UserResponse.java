package com.shoppingsystem.shopping_system.user.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.shoppingsystem.shopping_system.address.model.Address;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class UserResponse {
    private Long id;
    private String userEmail;
    private String userStatus;
    private String userFirstName;
    private String userLastName;
    private String passwordHash;
    private int userRoleId;
    private String userRoleName;
}
