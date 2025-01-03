package com.shoppingsystem.shopping_system.wishlist.repository;

import com.shoppingsystem.shopping_system.wishlist.model.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {
    @Query("SELECT wi FROM WishlistItem wi WHERE wi.userId = :userId")
    List<WishlistItem> findByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(w) > 0 FROM WishlistItem w WHERE w.userId = :userId AND w.productId = :productId")
    boolean isProductInWishlist(@Param("userId") Long userId, @Param("productId") Long productId);


    boolean existsByUserIdAndProductId(Long userId, Long productId);
}
