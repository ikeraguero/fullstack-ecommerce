package com.shoppingsystem.shopping_system.product.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.shoppingsystem.shopping_system.config.MultipartFileDeserializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;


@Data
@AllArgsConstructor
public class ProductRequest {
    private Long id;
    private String name;
    private double price;
    private int stock_quantity;
    private int category_id;
    private String category_name;
    private String product_description;
    @JsonDeserialize(using = MultipartFileDeserializer.class)
    private MultipartFile image;

}
