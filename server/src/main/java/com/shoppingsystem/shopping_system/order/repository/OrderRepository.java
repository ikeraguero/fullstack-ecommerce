package com.shoppingsystem.shopping_system.order.repository;

import com.shoppingsystem.shopping_system.order.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT COUNT(oi) FROM OrderItem oi WHERE oi.order.orderId = :orderId")
    long countItemsInOrder(@Param("orderId") Long orderId);

}
