package com.shoppingsystem.shopping_system.order.controller;

import com.shoppingsystem.shopping_system.cart.service.CartItemService;
import com.shoppingsystem.shopping_system.category.service.CategoryService;
import com.shoppingsystem.shopping_system.order.dto.OrderRequest;
import com.shoppingsystem.shopping_system.order.dto.OrderResponse;
import com.shoppingsystem.shopping_system.order.dto.OrdersResponse;
import com.shoppingsystem.shopping_system.order.exception.OrderNotFoundException;
import com.shoppingsystem.shopping_system.order.service.OrderItemService;
import com.shoppingsystem.shopping_system.order.service.OrderService;
import com.shoppingsystem.shopping_system.product.service.ProductImageService;
import com.shoppingsystem.shopping_system.product.service.ProductService;
import com.shoppingsystem.shopping_system.user.exception.UserNotFoundException;
import com.shoppingsystem.shopping_system.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;


    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private ProductImageService productImageService;

    @GetMapping("/order/{orderId}")
    ResponseEntity<?> findOrder(@PathVariable Long orderId) {
        try {
            OrderResponse orderResponse = orderService.findById(orderId);
            return ResponseEntity.ok(orderResponse);
        } catch (OrderNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/orders")
    public ResponseEntity<?> findAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            OrdersResponse ordersResponse = orderService.findAll(page, size);
            return ResponseEntity.ok(ordersResponse);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/order")
    ResponseEntity<?> saveOrder(@RequestBody OrderRequest orderRequest) {
        try {
            OrderResponse savedOrder = orderService.addOrder(orderRequest);
            return ResponseEntity.status(201).body(savedOrder);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @PutMapping("/order/{orderId}")
    public ResponseEntity<?> updateOrder(@PathVariable Long orderId, @RequestBody OrderRequest orderRequest) {
        try {
            orderService.updateOrder(orderId, orderRequest);
            return ResponseEntity.ok("Order updated successfully");
        } catch (OrderNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }

    }

    @GetMapping("/orders/user/{userId}")
    public ResponseEntity<?> getOrdersByUser(@PathVariable Long userId) {
        try {
            List<OrderResponse> orderResponseList = orderService.findAllOrdersByUser(userId);
            return ResponseEntity.ok().body(orderResponseList);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }
}

