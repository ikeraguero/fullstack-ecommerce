package com.shoppingsystem.shopping_system.service;

import com.shoppingsystem.shopping_system.model.Cart;
import com.shoppingsystem.shopping_system.model.Category;
import com.shoppingsystem.shopping_system.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class CartServiceImpl implements CartService{

    @Autowired
    CartRepository cartRepository;


    @Override
    public Cart findById(int id) {
        Optional<Cart> result = cartRepository.findById(id);
        Cart theCart = null;
        if(result.isPresent()) {
            theCart = result.get();
        } else {
            throw new RuntimeException("Did not find product with id - " + id);
        }
        return theCart;
    }

    @Override
    public Cart save(Cart cart) {
        return cartRepository.save(cart);
    }
}
