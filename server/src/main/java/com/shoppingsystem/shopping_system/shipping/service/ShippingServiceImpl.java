package com.shoppingsystem.shopping_system.shipping.service;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ShippingServiceImpl implements ShippingService{

    @Override
    public Map<String, Object> calculateShipping(Map<String, String> request) {
        String postalCode = request.get("postalCode");

        if (postalCode == null || postalCode.isEmpty()) {
            throw new IllegalArgumentException("Postal code is required");
        }

        int shippingPrice = postalCode.startsWith("1") ? 10 : 15;

        return Map.of("shippingPrice", shippingPrice);
    }
}
