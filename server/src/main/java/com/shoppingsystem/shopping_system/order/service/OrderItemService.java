package com.shoppingsystem.shopping_system.order.service;

import com.shoppingsystem.shopping_system.order.model.OrderItem;

import java.util.List;
import java.util.Optional;

public interface OrderItemService {
    void save(OrderItem orderItem);
    boolean hasUserBoughtProduct(Long productId, Long userId);
    List<OrderItem> findAllByOrderId(Long orderId);
    long countDistinctProducts();
}
