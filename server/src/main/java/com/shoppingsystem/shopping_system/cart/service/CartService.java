package com.shoppingsystem.shopping_system.cart.service;

import com.shoppingsystem.shopping_system.cart.dto.CartResponse;
import com.shoppingsystem.shopping_system.cart.model.Cart;

public interface CartService {
    Boolean isProductInUserCart(Long userId, Long productId);
    CartResponse findByUserId(Long id);
    Cart findById(Long id);
    Cart save(Cart cart);


}
