package com.shoppingsystem.shopping_system.product.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductImageDTO {

    public ProductImageDTO(Long id, String type, byte[] image_data) {
        this.id = id;
        this.type = type;
        this.image_data = image_data;
    }

    private Long id;
    private String type;
    private byte[] image_data;
}
