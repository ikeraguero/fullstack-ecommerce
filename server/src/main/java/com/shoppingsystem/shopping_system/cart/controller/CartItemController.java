package com.shoppingsystem.shopping_system.cart.controller;

import com.shoppingsystem.shopping_system.cart.dto.CartItemDTO;
import com.shoppingsystem.shopping_system.cart.model.Cart;
import com.shoppingsystem.shopping_system.cart.model.CartItem;
import com.shoppingsystem.shopping_system.cart.repository.CartItemRepository;
import com.shoppingsystem.shopping_system.cart.service.CartService;
import com.shoppingsystem.shopping_system.product.model.Product;
import com.shoppingsystem.shopping_system.cart.repository.CartRepository;
import com.shoppingsystem.shopping_system.product.repository.ProductRepository;
import com.shoppingsystem.shopping_system.cart.service.CartItemService;
import com.shoppingsystem.shopping_system.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("cartItem/{cartItemId}")
    CartItemDTO getCartItem(@PathVariable Long cartItemId) {
        return cartItemService.findById(cartItemId);
    }

    @PostMapping("cartItem")
    CartItem addCartItem(@RequestBody CartItemDTO cartItemDTO) {
        if(cartService.isProductInUserCart((cartService.findById(cartItemDTO.getCart_id())).getUserId(),
                cartItemDTO.getProduct_id())) {

            // query to find cartItem by product_id
            CartItem cartItem = cartItemService.findCartItemByCartAndProduct(cartItemDTO.getCart_id(),
                    cartItemDTO.getProduct_id());

            cartItem.setQuantity(cartItem.getQuantity() + cartItemDTO.getQuantity());
            return cartItemService.save(cartItem);
        }

        Product product = productService.findByIdEntity(cartItemDTO.getProduct_id())
                .orElseThrow(() -> new RuntimeException("Couldn't find product"));

        Cart cart = cartService.findById(cartItemDTO.getCart_id());

        CartItem cartItem = new CartItem();
        cartItem.setPrice(cartItemDTO.getPrice());
        cartItem.setQuantity(cartItemDTO.getQuantity());
        cartItem.setProduct(product);
        cartItem.setCart(cart);

        return cartItemService.save(cartItem);
    }

    @DeleteMapping("/cart/{cartItemId}")
    public void deleteCartItem(@PathVariable Long cartItemId) {
        cartItemService.delete(cartItemId);
    }
}
