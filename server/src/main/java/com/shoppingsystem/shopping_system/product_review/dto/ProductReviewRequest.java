package com.shoppingsystem.shopping_system.product_review.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ProductReviewRequest {
    private Long productId;
    private Long userId;
    private int rating;
    private String comment;
    private Date date;
}
