package com.shoppingsystem.shopping_system.order.service;

import com.shoppingsystem.shopping_system.order.dto.OrderRequest;
import com.shoppingsystem.shopping_system.order.dto.OrderResponse;
import com.shoppingsystem.shopping_system.order.dto.OrdersResponse;
import com.shoppingsystem.shopping_system.order.model.Order;
import com.shoppingsystem.shopping_system.order.model.OrderItem;

import java.util.List;

public interface OrderService {
    OrdersResponse findAll(int page, int size) ;
    void save(Order order);
    Long countItemsInOrder(Long orderId);
    OrderResponse findById(Long orderId);
    Order findByIdEntity(Long orderId);
    List<OrderItem> findAllOrderItemsEntity(Long orderId);
    List<OrderResponse> findAllOrdersByUser(Long userId);
    OrderResponse addOrder(OrderRequest orderRequest);
    void updateOrder(Long orderId, OrderRequest orderRequest);
}
