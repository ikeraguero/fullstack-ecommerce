package com.shoppingsystem.shopping_system.order.service;

import com.shoppingsystem.shopping_system.order.repository.OrderRepository;
import com.shoppingsystem.shopping_system.order.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public void save(Order order) {
        orderRepository.save(order);
    }
}
