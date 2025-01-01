package com.shoppingsystem.shopping_system.cart.controller;

import com.shoppingsystem.shopping_system.cart.dto.CartResponse;
import com.shoppingsystem.shopping_system.cart.model.Cart;
import com.shoppingsystem.shopping_system.cart.service.CartService;
import com.shoppingsystem.shopping_system.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api")
@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @GetMapping("/cart/{userId}")
    public ResponseEntity<?> getCart(@PathVariable Long userId) {
        CartResponse cartResponse = cartService.findByUserId(userId);

        if(cartResponse==null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart not found for user");
        }

    return ResponseEntity.ok(cartResponse);
    }

    @GetMapping("/cart/{userId}/{productId}")
    public ResponseEntity<?> isProductInUserCart(@PathVariable Long userId, @PathVariable Long productId) {
        try {
            Boolean isProductInUserCart = cartService.isProductInUserCart(userId, productId);
            return ResponseEntity.ok(isProductInUserCart);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }

    }

    @PostMapping("/cart")
    public ResponseEntity<?> addCart(@RequestBody Cart cart) {
        try {
            Cart savedCart = cartService.save(cart);
            return ResponseEntity.status(201).body(savedCart);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
