package com.shoppingsystem.shopping_system.payment.controller;

import com.shoppingsystem.shopping_system.payment.dto.PaymentRequest;
import com.shoppingsystem.shopping_system.payment.dto.PaymentResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @PostMapping("/process")
    public PaymentResponse processPayment(@RequestBody PaymentRequest paymentRequest) {
        if (paymentRequest.getEmail() == null || paymentRequest.getCardNumber() == null ||
                paymentRequest.getExpiration() == null || paymentRequest.getCvc() == null ||
                paymentRequest.getCardholderName() == null) {
            return new PaymentResponse("Payment failed: Missing required fields", false);
        }


        boolean paymentSuccess = Math.random() > 0.5;

        if (paymentSuccess) {
            return new PaymentResponse("Payment successful", true);
        } else {
            return new PaymentResponse("Payment denied", false);
        }
    }
}
