package com.shoppingsystem.shopping_system.cart.service;

import com.shoppingsystem.shopping_system.cart.dto.CartItemRequest;
import com.shoppingsystem.shopping_system.cart.dto.CartItemResponse;
import com.shoppingsystem.shopping_system.cart.model.CartItem;

import java.util.List;
import java.util.Optional;

public interface CartItemService {
    CartItemResponse findById(Long id);
    CartItem save(CartItem cartItem);
    Optional<CartItem> findByIdEntity(Long id);
    CartItem findCartItemByCartAndProduct(Long cartId, Long productId);
    void delete(Long cartItemId);
    List<CartItem> findCartItemsByUser(Long userId);
    void deleteCartItemsByUserId(Long userId);
    List<CartItem> findByCartId(Long cartId);
    List<CartItem> findAll();
    CartItemResponse addCartItem(CartItemRequest cartItemRequest);
    CartItemResponse updateCartItem(CartItemRequest cartItemRequest);
}
