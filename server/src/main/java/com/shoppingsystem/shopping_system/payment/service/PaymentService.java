package com.shoppingsystem.shopping_system.payment.service;

import com.shoppingsystem.shopping_system.payment.dto.PaymentResponse;
import com.shoppingsystem.shopping_system.order.model.Order;
import com.stripe.exception.StripeException;

public interface PaymentService {
    public PaymentResponse createPaymentLink(Order order) throws StripeException;
}
