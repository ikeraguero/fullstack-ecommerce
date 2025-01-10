package com.shoppingsystem.shopping_system.order.repository;

import com.shoppingsystem.shopping_system.order.model.Order;
import com.shoppingsystem.shopping_system.order.model.OrderItem;
import com.shoppingsystem.shopping_system.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    @Query("SELECT COUNT(oi) > 0 FROM OrderItem oi JOIN oi.order o WHERE oi.product.id = :productId " +
            "AND o.user.id = :userId AND o.status = 'paid'")
    boolean hasUserBoughtProduct(@Param("productId") Long productId, @Param("userId") Long userId);

    @Query("SELECT COUNT(DISTINCT oi.product.id) FROM OrderItem oi")
    long countDistinctProducts();

    List<OrderItem> findAllByOrderId(Long orderId);

    Optional<OrderItem> findByOrderAndProduct(Order order, Product product);
}
