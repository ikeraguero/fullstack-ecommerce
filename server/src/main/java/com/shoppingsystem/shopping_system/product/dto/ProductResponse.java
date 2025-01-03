package com.shoppingsystem.shopping_system.product.dto;

import com.shoppingsystem.shopping_system.product_review.dto.ProductReviewResponse;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;


@Data
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
    private boolean canUserReview;
    private boolean isInUserWishlist;

    public ProductResponse(Long id, String name, double price, int stock_quantity, int category_id,
                           String category_name, String product_description, String image_type, byte[] image_data,
                           Long image_id, List<ProductReviewResponse> productReviewList, boolean isInUserWishlist) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock_quantity = stock_quantity;
        this.category_id = category_id;
        this.category_name = category_name;
        this.product_description = product_description;
        this.image_type = image_type;
        this.image_data = image_data;
        this.image_id = image_id;
        this.productReviewList = productReviewList;
        this.isInUserWishlist = isInUserWishlist;
    }

    public ProductResponse(Long id, String name, double price, int stock_quantity, int category_id,
                           String category_name, String product_description, String image_type, byte[] image_data,
                           Long image_id, List<ProductReviewResponse> productReviewList) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock_quantity = stock_quantity;
        this.category_id = category_id;
        this.category_name = category_name;
        this.product_description = product_description;
        this.image_type = image_type;
        this.image_data = image_data;
        this.image_id = image_id;
        this.productReviewList = productReviewList;
    }
}
