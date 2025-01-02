package com.shoppingsystem.shopping_system.shipping.service;

import java.util.Map;

public interface ShippingService {
    Map<String, Object> calculateShipping(Map<String, String> request);
}
