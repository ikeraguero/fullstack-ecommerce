package com.shoppingsystem.shopping_system.order.service;

import com.shoppingsystem.shopping_system.order.model.OrderItem;

public interface OrderItemService {
    void save(OrderItem orderItem);
    boolean hasUserBoughtProduct(Long productId, Long userId);
}
