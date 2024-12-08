package com.shoppingsystem.shopping_system.service;

import com.shoppingsystem.shopping_system.dto.CartItemDTO;
import com.shoppingsystem.shopping_system.model.CartItem;

public interface CartItemService {
    CartItemDTO findById(Long id);
    CartItem save(CartItem cartItem);
}
