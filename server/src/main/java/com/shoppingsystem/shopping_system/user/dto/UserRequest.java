package com.shoppingsystem.shopping_system.user.dto;

import com.shoppingsystem.shopping_system.address.dto.AddressRequest;
import lombok.Data;

@Data
public class UserRequest {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private AddressRequest address;
    private int roleId;
}
