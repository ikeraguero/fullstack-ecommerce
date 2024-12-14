package com.shoppingsystem.shopping_system.product.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class ProductImageDTO {

    private Long id;
    private String type;
    private byte[] image_data;
}
