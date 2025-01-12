package com.shoppingsystem.shopping_system.address.dto;

import lombok.Data;

@Data
public class AddressRequest {
    private Long id;
    private String address;
    private String postalCode;
    private String country;
    private String city;
}
