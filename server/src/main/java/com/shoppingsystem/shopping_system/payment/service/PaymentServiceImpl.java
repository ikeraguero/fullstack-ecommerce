package com.shoppingsystem.shopping_system.payment.service;

import com.shoppingsystem.shopping_system.payment.dto.PaymentRequest;
import com.shoppingsystem.shopping_system.payment.dto.PaymentResponse;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService{
    @Override
    public PaymentResponse processPayment(PaymentRequest paymentRequest) {
        if (paymentRequest.getEmail() == null || paymentRequest.getCardNumber() == null ||
                paymentRequest.getExpiration() == null || paymentRequest.getCvc() == null ||
                paymentRequest.getCardholderName() == null) {
            throw new IllegalArgumentException("Payment failed: Missing required fields");
        }

        boolean paymentSuccess = true;
        if (paymentSuccess) {
            return new PaymentResponse("Payment successful", true);
        }
        return new PaymentResponse("Payment denied", false);
    }
}
