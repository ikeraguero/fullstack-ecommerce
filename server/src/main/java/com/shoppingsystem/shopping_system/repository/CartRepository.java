package com.shoppingsystem.shopping_system.repository;

import com.shoppingsystem.shopping_system.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {
}
