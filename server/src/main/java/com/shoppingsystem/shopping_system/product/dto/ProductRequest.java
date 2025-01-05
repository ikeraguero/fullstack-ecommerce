package com.shoppingsystem.shopping_system.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class ProductRequest {
    private Long id;
    private String name;
    private double price;
    private int stockQuantity;
    private int categoryId;
    private String categoryMame;
    private String productDescription;

}
