package com.shoppingsystem.shopping_system.repository;

import com.shoppingsystem.shopping_system.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
}
