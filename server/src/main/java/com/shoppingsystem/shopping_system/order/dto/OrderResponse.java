package com.shoppingsystem.shopping_system.order.dto;

import com.shoppingsystem.shopping_system.order.model.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long orderId;
    private Long items;
    private double totalPrice;
    private List<OrderItemResponse> orderItems;

    public OrderResponse(Long orderId, Long items, double totalPrice) {
        this.orderId = orderId;
        this.items = items;
        this.totalPrice = totalPrice;
    }
}
