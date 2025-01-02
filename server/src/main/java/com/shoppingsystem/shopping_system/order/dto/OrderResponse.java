package com.shoppingsystem.shopping_system.order.dto;

import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long orderId;
    private Long items;
    private double totalPrice;
    private List<OrderItemResponse> orderItems;
    private Date date;
    private String status;

    public OrderResponse(Long orderId, Long items, double totalPrice, Date date, String status) {
        this.orderId = orderId;
        this.items = items;
        this.totalPrice = totalPrice;
        this.date = date;
        this.status = status;
    }
}
