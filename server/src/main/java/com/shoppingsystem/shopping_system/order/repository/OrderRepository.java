package com.shoppingsystem.shopping_system.order.repository;

import com.shoppingsystem.shopping_system.order.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
