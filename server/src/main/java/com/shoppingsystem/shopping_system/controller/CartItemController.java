package com.shoppingsystem.shopping_system.controller;

import com.shoppingsystem.shopping_system.dto.CartItemDTO;
import com.shoppingsystem.shopping_system.model.Cart;
import com.shoppingsystem.shopping_system.model.CartItem;
import com.shoppingsystem.shopping_system.model.Product;
import com.shoppingsystem.shopping_system.repository.CartRepository;
import com.shoppingsystem.shopping_system.repository.ProductRepository;
import com.shoppingsystem.shopping_system.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api")
@RestController
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("cartItem/{cartItemId}")
    CartItemDTO getCartItem(@PathVariable Long cartItemId) {
        return cartItemService.findById(cartItemId);
    }

    @PostMapping("cartItem")
    CartItem addCartItem(@RequestBody CartItemDTO cartItemDTO) {
        Product product = productRepository.findById(cartItemDTO.getProduct_id())
                .orElseThrow(()-> new Error("Product not found"));


        Cart cart = cartRepository.findById(cartItemDTO.getCart_id())
                .orElseThrow(() -> new Error("Cart not found"));


        CartItem cartItem = new CartItem();
        cartItem.setPrice(cartItemDTO.getPrice());
        cartItem.setQuantity(cartItemDTO.getQuantity());
        cartItem.setProduct(product);
        cartItem.setCart(cart);

        return cartItemService.save(cartItem);
    }
}
