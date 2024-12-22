package com.shoppingsystem.shopping_system.order.service;

import com.shoppingsystem.shopping_system.order.dto.OrderResponse;
import com.shoppingsystem.shopping_system.order.model.OrderItem;
import org.springframework.http.ResponseEntity;

public interface OrderItemService {
    void save(OrderItem orderItem);

}
