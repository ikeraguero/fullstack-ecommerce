package com.shoppingsystem.shopping_system.shipping.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ShippingController {

    @PostMapping("/calculate-shipping")
    public Map<String, Object> calculateShipping(@RequestBody Map<String, String> request) {
        String postalCode = request.get("postalCode");

        if (postalCode == null || postalCode.isEmpty()) {
            throw new IllegalArgumentException("Postal code is required");
        }

        int shippingPrice = postalCode.startsWith("1") ? 10 : 15;

        return Map.of("shippingPrice", shippingPrice);
    }
}
