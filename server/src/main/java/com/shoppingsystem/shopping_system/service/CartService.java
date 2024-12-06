package com.shoppingsystem.shopping_system.service;

import com.shoppingsystem.shopping_system.model.Cart;

public interface CartService {
    Cart findById(int id);
    Cart save(Cart cart);
}
