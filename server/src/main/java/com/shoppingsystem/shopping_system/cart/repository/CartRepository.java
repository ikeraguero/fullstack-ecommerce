package com.shoppingsystem.shopping_system.cart.repository;

import com.shoppingsystem.shopping_system.cart.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    @Query("SELECT c FROM Cart c WHERE c.user.id = :userId")
    Optional<Cart> findByUserId(@Param("userId") Long userId);

    // check if a specific product is in a specific users cart
    @Query("SELECT CASE WHEN COUNT(ci) > 0 THEN true ELSE false END " +
            "FROM CartItem ci JOIN ci.cart c " +
            "WHERE c.user.id = :userId AND ci.product.id = :productId")
    Boolean isProductInUserCart(@Param("userId") Long userId, @Param("productId") Long productId);
}
