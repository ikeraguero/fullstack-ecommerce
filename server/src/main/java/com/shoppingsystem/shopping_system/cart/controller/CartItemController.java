package com.shoppingsystem.shopping_system.cart.controller;

import com.shoppingsystem.shopping_system.cart.dto.CartItemRequest;
import com.shoppingsystem.shopping_system.cart.dto.CartItemResponse;
import com.shoppingsystem.shopping_system.cart.service.CartItemService;
import com.shoppingsystem.shopping_system.cart.service.CartService;
import com.shoppingsystem.shopping_system.product.service.ProductService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api")
@RestController
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private CartService cartService;

    @Autowired
    private ProductService productService;

    @GetMapping("/cartItem/{cartItemId}")
    ResponseEntity<?> getCartItem(@PathVariable Long cartItemId) {
        try {
            CartItemResponse cartItemResponse = cartItemService.findById(cartItemId);
            return ResponseEntity.ok(cartItemResponse);
        } catch (EntityNotFoundException e){
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/cartItem")
    ResponseEntity<?> addCartItem(@RequestBody CartItemRequest cartItemRequest) {
        try {
            CartItemResponse cartItemResponse= cartItemService.addCartItem(cartItemRequest);
            return ResponseEntity.ok(cartItemResponse);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }

    @PutMapping("/cartItem")
   ResponseEntity<?> updateCartItem(@RequestBody CartItemRequest cartItemRequest) {
        try{
            CartItemResponse cartItemResponse = cartItemService.updateCartItem(cartItemRequest);
            return ResponseEntity.ok(cartItemResponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }

    @DeleteMapping("/cart/{cartItemId}")
    public ResponseEntity<?> deleteCartItem(@PathVariable Long cartItemId) {
        try{
            cartItemService.delete(cartItemId);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }
}
