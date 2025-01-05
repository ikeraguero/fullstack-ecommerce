package com.shoppingsystem.shopping_system.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemResponse {
    private Long id;
    private Long cartId;
    private Long productId;
    private String productName;
    private String categoryName;
    private int quantity;
    private double price;
    private byte[] imageData;
    private String imageType;
}
