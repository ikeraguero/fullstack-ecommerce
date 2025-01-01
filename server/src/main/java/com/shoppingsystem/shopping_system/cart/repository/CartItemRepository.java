package com.shoppingsystem.shopping_system.cart.repository;

import com.shoppingsystem.shopping_system.cart.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Query("SELECT ci FROM CartItem ci JOIN ci.cart c WHERE c.id = :cartId AND ci.product.id = :productId")
    CartItem findCartItemByCartAndProduct(@Param("cartId") Long cartId, @Param("productId") Long productId);

    @Query("SELECT ci FROM CartItem ci JOIN ci.cart c WHERE c.user.id = :userId")
    List<CartItem> findCartItemsByUser(@Param("userId") Long userId);

    @Query("SELECT ci FROM CartItem ci JOIN ci.cart c WHERE c.id = :cartId")
    List<CartItem> findByCartId(@Param("cartId") Long cartId);

    @Modifying
    @Query("DELETE FROM CartItem ci WHERE ci.cart.user.id = :userId")
    void deleteCartItemsByUserId(@Param("userId") Long userId);
}
