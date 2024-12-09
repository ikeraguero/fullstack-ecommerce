package com.shoppingsystem.shopping_system.cart.service;

import com.shoppingsystem.shopping_system.cart.dto.CartItemDTO;
import com.shoppingsystem.shopping_system.cart.model.CartItem;

import java.util.Optional;

public interface CartItemService {
    CartItemDTO findById(Long id);
    CartItem save(CartItem cartItem);
    Optional<CartItem> findByIdEntity(Long id);
    CartItem findCartItemByCartAndProduct(Long cartId, Long productId);
    void delete(Long cartItemId);
}
