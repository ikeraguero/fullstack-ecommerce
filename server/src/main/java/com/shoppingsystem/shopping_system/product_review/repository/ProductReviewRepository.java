package com.shoppingsystem.shopping_system.product_review.repository;

import com.shoppingsystem.shopping_system.product_review.model.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductReviewRepository extends JpaRepository<ProductReview, Long> {
    @Query("SELECT pr FROM ProductReview pr WHERE pr.product.id = :productId")
    List<ProductReview> findAllReviewsByProduct(Long productId);

    @Query("SELECT pr FROM ProductReview pr JOIN pr.product p WHERE p.id IN :productIds")
    List<ProductReview> findReviewByProductsId(@Param("productIds") List<Long> productIds);

    @Query("SELECT COUNT(pr) > 0 FROM ProductReview pr WHERE pr.product.id = :productId AND pr.user.id = :userId")
    boolean existsByProductIdAndUserId(@Param("productId") Long productId, @Param("userId") Long userId);
}
