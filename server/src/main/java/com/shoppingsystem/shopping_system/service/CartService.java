package com.shoppingsystem.shopping_system.service;

import com.shoppingsystem.shopping_system.dto.CartDTO;
import com.shoppingsystem.shopping_system.model.Cart;

public interface CartService {
    Boolean isProductInUserCart(Long userId, Long productId);
    CartDTO findByUserId(Long id);
    Cart findById(Long id);
    Cart save(Cart cart);
}
