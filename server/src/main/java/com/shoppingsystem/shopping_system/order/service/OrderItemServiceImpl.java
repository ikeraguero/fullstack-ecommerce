package com.shoppingsystem.shopping_system.order.service;

import com.shoppingsystem.shopping_system.order.model.OrderItem;
import com.shoppingsystem.shopping_system.order.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemServiceImpl implements OrderItemService{

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public void save(OrderItem orderItem) {
        orderItemRepository.save(orderItem);
    }


    @Override
    public boolean hasUserBoughtProduct(Long productId, Long userId) {
        return orderItemRepository.hasUserBoughtProduct(productId, userId);
    }

    @Override
    public List<OrderItem> findAllByOrderId(Long orderId) {
        return orderItemRepository.findAllByOrderId(orderId);
    }

    @Override
    public long countDistinctProducts() {
        return orderItemRepository.countDistinctProducts();
    }
}
