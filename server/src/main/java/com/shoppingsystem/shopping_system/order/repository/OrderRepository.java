package com.shoppingsystem.shopping_system.order.repository;

import com.shoppingsystem.shopping_system.order.model.Order;
import com.shoppingsystem.shopping_system.order.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT COUNT(oi) FROM OrderItem oi WHERE oi.order.orderId = :orderId")
    long countItemsInOrder(@Param("orderId") Long orderId);

    @Query("SELECT oi FROM OrderItem oi WHERE oi.order.orderId = :orderId")
    List<OrderItem> findAllOrderItems(@Param("orderId") Long orderId);

    @Query("SELECT o FROM Order o WHERE o.user.id = :userId")
    List<Order> findAllOrdersByUser(@Param("userId") Long userId);

    @Query("SELECT oi FROM OrderItem oi " +
            "JOIN FETCH oi.product p " +
            "JOIN FETCH ProductImage pi ON pi.id = p.imageId " +
            "WHERE oi.order.orderId = :orderId")
    List<OrderItem> findOrderItemsWithProductImages(@Param("orderId") Long orderId);

}
