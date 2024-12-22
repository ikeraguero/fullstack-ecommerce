package com.shoppingsystem.shopping_system.order.service;

import com.shoppingsystem.shopping_system.order.dto.OrderResponse;
import com.shoppingsystem.shopping_system.order.model.Order;
import org.springframework.http.ResponseEntity;

public interface OrderService {
    void save(Order order);
    Long countItemsInOrder(Long orderId);
    ResponseEntity<OrderResponse> findById(Long orderId);
    Order findByIdEntity(Long orderId);
}
