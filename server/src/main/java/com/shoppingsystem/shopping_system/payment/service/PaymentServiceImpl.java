package com.shoppingsystem.shopping_system.payment.service;

import com.shoppingsystem.shopping_system.order.service.OrderService;
import com.shoppingsystem.shopping_system.payment.dto.PaymentRequest;
import com.shoppingsystem.shopping_system.payment.dto.PaymentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService{

    @Autowired
    private OrderService orderService;

    @Override
    public PaymentResponse processPayment(PaymentRequest paymentRequest) {
        if (paymentRequest.getEmail() == null || paymentRequest.getCardNumber() == null ||
                paymentRequest.getExpiration() == null || paymentRequest.getCvc() == null ||
                paymentRequest.getCardholderName() == null) {
            throw new IllegalArgumentException("Payment failed: Missing required fields");
        }

        boolean paymentSuccess = true;

        if (paymentSuccess) {
            orderService.updateOrder(paymentRequest.getOrderId(), paymentRequest.getOrderRequest());
            return new PaymentResponse("Payment successful, order updated", true);
        }
        return new PaymentResponse("Payment denied", false);
    }
}
