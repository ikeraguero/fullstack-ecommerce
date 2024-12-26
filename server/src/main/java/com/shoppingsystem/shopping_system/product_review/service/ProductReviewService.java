package com.shoppingsystem.shopping_system.product_review.service;

import com.shoppingsystem.shopping_system.product_review.dto.ProductReviewResponse;

import java.util.List;

public interface ProductReviewService {
    List<ProductReviewResponse> findAllReviewsByProduct(Long productId);
}
