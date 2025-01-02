package com.shoppingsystem.shopping_system.order.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderItemRequest {
    private Long productId;
    private int quantity;
    private double totalPrice;
}
