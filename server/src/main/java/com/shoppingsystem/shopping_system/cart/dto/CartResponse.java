package com.shoppingsystem.shopping_system.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CartResponse {

    private Long id;
    private List<CartItemResponse> cartItems;
}
