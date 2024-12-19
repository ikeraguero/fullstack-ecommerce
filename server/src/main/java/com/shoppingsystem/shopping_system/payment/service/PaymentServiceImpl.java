package com.shoppingsystem.shopping_system.payment.service;

import com.shoppingsystem.shopping_system.payment.dto.PaymentResponse;
import com.stripe.Stripe;
import com.stripe.model.Order;
import com.stripe.model.billingportal.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Override
    public PaymentResponse createPaymentLink(Order order) {

        Stripe.apiKey=stripeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http:localhost:5173/success")
                .setCancelUrl("http:localhost:5173/failure")
                .addLineItem(SessionCreateParams.LineItem.builder().setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("USD")
                                .setUnitAmount((long) order.getTotalPrice*100)
                                .setProductData(SessionCreateParams.LineItem.PriceData
                                        .ProductData.builder().setName("sneaker")
                                        .build())
                                .build()
                        )
                        .build()
                )
                .build();

        Session session = Session.create(params);

        PaymentResponse res = new PaymentResponse();
        res.setPayment_url(session.getUrl());

        return res;
    }
}
