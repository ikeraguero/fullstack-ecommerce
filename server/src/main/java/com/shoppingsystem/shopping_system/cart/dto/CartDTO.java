package com.shoppingsystem.shopping_system.cart.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class CartDTO {

    public CartDTO(Long id, List<CartItemDTO> cartItems) {
        this.id = id;
        this.cartItems = cartItems;
    }

    private Long id;
    private List<CartItemDTO> cartItems;
}
