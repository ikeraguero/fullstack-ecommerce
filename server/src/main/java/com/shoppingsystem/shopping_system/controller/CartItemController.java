package com.shoppingsystem.shopping_system.controller;

import com.shoppingsystem.shopping_system.dto.CartItemDTO;
import com.shoppingsystem.shopping_system.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RestController
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @GetMapping("cartItem/{cartItemId}")
    CartItemDTO getCartItem(@PathVariable int cartItemId) {
        return cartItemService.findById(cartItemId);
    }
}
