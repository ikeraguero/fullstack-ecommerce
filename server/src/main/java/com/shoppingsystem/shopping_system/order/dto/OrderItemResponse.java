package com.shoppingsystem.shopping_system.order.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemResponse {

    private Long orderItemId;
    private String productName;
    private double totalPrice;
    private int quantity;
    private byte[] imageData;
    private String imageType;

}
