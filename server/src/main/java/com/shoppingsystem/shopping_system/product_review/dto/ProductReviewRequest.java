package com.shoppingsystem.shopping_system.product_review.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ProductReviewRequest {
    private Long productId;
    private Long userId;
    private int rating;
    private String comment;
    private Date date;
}
