package com.shoppingsystem.shopping_system.product_review.service;

import com.shoppingsystem.shopping_system.product_review.dto.ProductReviewRequest;
import com.shoppingsystem.shopping_system.product_review.dto.ProductReviewResponse;
import com.shoppingsystem.shopping_system.product_review.model.ProductReview;

import java.util.List;

public interface ProductReviewService {
    List<ProductReviewResponse> findAllReviewsByProduct(Long productId);
    void saveReview(ProductReviewRequest productReviewRequest);

    List<ProductReview> findReviewByProductsId(List<Long> productsId);
}
