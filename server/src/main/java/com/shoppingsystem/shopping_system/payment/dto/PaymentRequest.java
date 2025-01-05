package com.shoppingsystem.shopping_system.payment.dto;

import com.shoppingsystem.shopping_system.order.dto.OrderRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequest {
    private Long orderId;
    private String email;
    private String paymentMethod;
    private String cardNumber;
    private String expiration;
    private String cvc;
    private String cardholderName;
    private OrderRequest orderRequest;
}
