package com.shoppingsystem.shopping_system.order.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemResponse {

    private Long orderItemId;
    private String productName;
    private double totalPrice;
    private int quantity;

}
