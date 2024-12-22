package com.shoppingsystem.shopping_system.cart.controller;

import com.shoppingsystem.shopping_system.cart.dto.CartDTO;
import com.shoppingsystem.shopping_system.cart.model.Cart;
import com.shoppingsystem.shopping_system.cart.service.CartService;
import com.shoppingsystem.shopping_system.user.model.User;
import com.shoppingsystem.shopping_system.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api")
@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @GetMapping("/cart/{userId}")
    public CartDTO getCart(@PathVariable Long userId) {
        CartDTO cartDTO = cartService.findByUserId(userId);;
        if(cartDTO == null) {
            User user = userService.findById(userId);
            Cart cart = new Cart("active", user);
            cartService.save(cart);
        }

        return cartService.findByUserId(userId);
    }

    @GetMapping("/cart/{userId}/{productId}")
    public Boolean isProductInUserCart(@PathVariable Long userId, @PathVariable Long productId) {
        return cartService.isProductInUserCart(userId, productId);
    }

    @PostMapping("/cart")
    public Cart addCart(Cart cart) {
        return cartService.save(cart);
    }
}
