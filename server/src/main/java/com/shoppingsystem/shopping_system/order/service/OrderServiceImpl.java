package com.shoppingsystem.shopping_system.order.service;

import com.shoppingsystem.shopping_system.order.dto.OrderItemResponse;
import com.shoppingsystem.shopping_system.order.dto.OrderResponse;
import com.shoppingsystem.shopping_system.order.model.OrderItem;
import com.shoppingsystem.shopping_system.order.repository.OrderRepository;
import com.shoppingsystem.shopping_system.order.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

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
        OrderResponse orderResponse = new OrderResponse(order.getOrderId(),
                orderRepository.countItemsInOrder(order.getOrderId()),
                order.getTotalPrice());

        List<OrderItemResponse> orderItemList = findAllOrderItems(orderResponse.getOrderId());
        orderResponse.setOrderItems(orderItemList);
        return new ResponseEntity<>(orderResponse, HttpStatus.OK);
    }

    public Order findByIdEntity(Long orderId) {
        return orderRepository.findById(orderId).orElseThrow(()->new RuntimeException("Couldn't find order"));
    }

    @Override
    public List<OrderItemResponse> findAllOrderItems(Long orderId) {
        List<OrderItem> orderItemList = orderRepository.findAllOrderItems(orderId);
        List<OrderItemResponse> orderItemResponseList = new LinkedList<>();
        for(OrderItem orderItem : orderItemList) {
            OrderItemResponse orderItemResponse = new OrderItemResponse(orderItem.getOrderItemId(),
                    orderItem.getProduct().getName(), orderItem.getTotalPrice(), orderItem.getQuantity());
            orderItemResponseList.add(orderItemResponse);
        }
        return orderItemResponseList;
    }

    @Override
    public List<OrderItem> findAllOrderItemsEntity(Long orderId) {
        return orderRepository.findAllOrderItems(orderId);
    }

    @Override
    public List<Order> findAllOrdersByUser(Long userId) {
        return orderRepository.findAllOrdersByUser(userId);
    }
}
