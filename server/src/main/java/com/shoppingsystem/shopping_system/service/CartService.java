package com.shoppingsystem.shopping_system.service;

import com.shoppingsystem.shopping_system.dto.CartDTO;
import com.shoppingsystem.shopping_system.model.Cart;

public interface CartService {
    CartDTO findByUserId(int id);
    Cart findById(int id);
    Cart save(Cart cart);
}
