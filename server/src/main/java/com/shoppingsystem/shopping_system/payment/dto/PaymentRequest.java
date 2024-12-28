package com.shoppingsystem.shopping_system.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequest {
    private String email;
    private String paymentMethod;
    private String cardNumber;
    private String expiration;
    private String cvc;
    private String cardholderName;
}
