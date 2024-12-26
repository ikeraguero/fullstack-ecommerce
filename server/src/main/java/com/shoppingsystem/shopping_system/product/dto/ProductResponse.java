package com.shoppingsystem.shopping_system.product.dto;

import com.shoppingsystem.shopping_system.product_review.dto.ProductReviewResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String name;
    private double price;
    private int stock_quantity;
    private int category_id;
    private String category_name;
    private String product_description;
    private String image_type;
    private byte[] image_data;
    private Long image_id;
    private List<ProductReviewResponse> productReviewList;
}
