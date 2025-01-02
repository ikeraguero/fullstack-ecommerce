package com.shoppingsystem.shopping_system.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartResponse {

    private Long id;
    private List<CartItemResponse> cartItems;
}
