package com.shoppingsystem.shopping_system.product_review.repository;

import com.shoppingsystem.shopping_system.product_review.model.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductReviewRepository extends JpaRepository<ProductReview, Long> {
    @Query("SELECT pr FROM ProductReview pr WHERE pr.product.id = :productId")
    List<ProductReview> findAllReviewsByProduct(Long productId);
}
