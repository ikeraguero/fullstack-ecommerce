package com.shoppingsystem.shopping_system.stripewebhook.controller;

import com.shoppingsystem.shopping_system.order.model.Order;
import com.shoppingsystem.shopping_system.order.repository.OrderRepository;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class StripeWebhookController {

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Value("${webhook.secretkey}")
    private String stripeWebhookSecret;

    @Autowired
    private final OrderRepository orderRepository;

    public StripeWebhookController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @PostMapping("/payment/webhook")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload,
                                                      @RequestHeader("Stripe-Signature") String sigHeader)
            throws IOException, StripeException {
        Event event = null;
        try {
            event = Webhook.constructEvent(payload, sigHeader, stripeWebhookSecret);
        } catch (SignatureVerificationException e) {
            return ResponseEntity.status(400).body("Webhook signature verification failed: " + e.getMessage());
        }

        if(event.getType().equals("checkout.session.completed")) {
            Session session = (Session) event.getData().getObject();

            String sessionId = session.getId();
            String paymentStatus = session.getPaymentStatus();

            if("paid".equals(paymentStatus)) {
                Long orderId = Long.valueOf(session.getMetadata().get("order_id"));

                Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
                order.setStatus("paid");
                orderRepository.save(order);
            }
        }
        return ResponseEntity.ok("Webhook handled successfully");
    }
}
