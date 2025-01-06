package com.shoppingsystem.shopping_system.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductImageDTO {

    private Long id;
    private String type;
    private String image_data;
}
