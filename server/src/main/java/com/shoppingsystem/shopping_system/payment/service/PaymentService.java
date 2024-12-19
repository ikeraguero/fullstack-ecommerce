package com.shoppingsystem.shopping_system.payment.service;

import com.shoppingsystem.shopping_system.payment.dto.PaymentResponse;
import com.stripe.model.Order;

public interface PaymentService {
    public PaymentResponse createPaymentLink(Order order);
}
