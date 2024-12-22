package com.shoppingsystem.shopping_system.order.service;

import com.shoppingsystem.shopping_system.order.dto.OrderResponse;
import com.shoppingsystem.shopping_system.order.repository.OrderRepository;
import com.shoppingsystem.shopping_system.order.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public void save(Order order) {
        orderRepository.save(order);
    }

    @Override
    public Long countItemsInOrder(Long orderId) {
        return orderRepository.countItemsInOrder(orderId);
    }

    @Override
    public ResponseEntity<OrderResponse> findById(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Couldn't find order"));
        OrderResponse orderResponse = new OrderResponse(order.getOrderId(), orderRepository.countItemsInOrder(order.getOrderId()), order.getTotalPrice());
        return new ResponseEntity<>(orderResponse, HttpStatus.OK);
    }

    public Order findByIdEntity(Long orderId) {
        return orderRepository.findById(orderId).orElseThrow(()->new RuntimeException("Couldn't find order"));
    }
}
