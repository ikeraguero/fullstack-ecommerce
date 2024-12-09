package com.shoppingsystem.shopping_system.cart.service;

import com.shoppingsystem.shopping_system.cart.dto.CartDTO;
import com.shoppingsystem.shopping_system.cart.model.Cart;
import com.shoppingsystem.shopping_system.cart.model.CartItem;

public interface CartService {
    Boolean isProductInUserCart(Long userId, Long productId);
    CartDTO findByUserId(Long id);
    Cart findById(Long id);
    Cart save(Cart cart);

}
