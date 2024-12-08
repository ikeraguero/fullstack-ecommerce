package com.shoppingsystem.shopping_system.repository;

import com.shoppingsystem.shopping_system.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
