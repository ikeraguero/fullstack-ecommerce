package com.shoppingsystem.shopping_system.order.controller;

import com.shoppingsystem.shopping_system.order.dto.OrderRequest;
import com.shoppingsystem.shopping_system.order.service.OrderService;
import com.shoppingsystem.shopping_system.order.model.Order;
import com.shoppingsystem.shopping_system.payment.dto.PaymentResponse;
import com.shoppingsystem.shopping_system.payment.service.PaymentService;
import com.shoppingsystem.shopping_system.user.model.User;
import com.shoppingsystem.shopping_system.user.repository.UserRepository;
import com.shoppingsystem.shopping_system.user.service.UserService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/order")
    ResponseEntity<PaymentResponse> saveOrder(@RequestBody OrderRequest orderRequest) throws StripeException {

        User user = userService.findById(orderRequest.getUserId());

        Order order = new Order(user, orderRequest.getTotalPrice(), orderRequest.getDate(),
                orderRequest.getDiscount(), orderRequest.getShippingAddress());

        PaymentResponse res = paymentService.createPaymentLink(order);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
