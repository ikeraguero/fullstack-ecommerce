package com.shoppingsystem.shopping_system.cart.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartItemRequest {
    private Long id;
    private Long cartId;
    private Long productId;
    private String productMame;
    private String categoryMame;
    private int quantity;
    private double price;
    private byte[] imageData;
    private String imageType;
}
