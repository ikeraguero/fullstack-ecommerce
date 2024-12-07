package com.shoppingsystem.shopping_system.controller;

import com.shoppingsystem.shopping_system.dto.CartDTO;
import com.shoppingsystem.shopping_system.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RestController
public class CartController {

    @Autowired
    private CartService cartService;


    @GetMapping("/cart/{userId}")
    public CartDTO getCart(@PathVariable int userId) {
        return cartService.findByUserId(userId);
    }
}
