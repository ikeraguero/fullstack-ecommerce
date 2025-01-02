package com.shoppingsystem.shopping_system.shipping.controller;

import com.shoppingsystem.shopping_system.shipping.service.ShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ShippingController {

    @Autowired
    private ShippingService shippingService;

    @PostMapping("/calculate-shipping")
    public ResponseEntity<?> calculateShipping(@RequestBody Map<String, String> request) {
        try {
            Map<String, Object> shipping = shippingService.calculateShipping(request);
            return ResponseEntity.ok(shipping);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e ) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
