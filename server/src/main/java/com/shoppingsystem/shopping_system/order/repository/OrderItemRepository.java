package com.shoppingsystem.shopping_system.order.repository;

import com.shoppingsystem.shopping_system.order.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    @Query("SELECT COUNT(oi) > 0 FROM OrderItem oi JOIN oi.order o WHERE oi.product.id = :productId AND o.user.id = :userId")
    boolean hasUserBoughtProduct(@Param("productId") Long productId, @Param("userId") Long userId);

    @Query("SELECT COUNT(DISTINCT oi.product.id) FROM OrderItem oi")
    long countDistinctProducts();

    List<OrderItem> findAllByOrderId(Long orderId);
}
