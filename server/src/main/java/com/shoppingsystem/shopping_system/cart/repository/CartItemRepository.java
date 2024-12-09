package com.shoppingsystem.shopping_system.cart.repository;

import com.shoppingsystem.shopping_system.cart.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Query("SELECT ci FROM CartItem ci JOIN ci.cart c WHERE c.id = :cartId AND ci.product.id = :productId")
    CartItem findCartItemByCartAndProduct(@Param("cartId") Long cartId, @Param("productId") Long productId);
}
