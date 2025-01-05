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
    private int stockQuantity;
    private int categoryId;
    private String categoryName;
    private String productDescription;
    private String imageType;
    private byte[] imageData;
    private Long imageId;
    private List<ProductReviewResponse> productReviewList;
    private boolean canUserReview;
    private boolean isInUserWishlist;
    private Long wishlistItemId;
    private List<?> relatedProducts;

    public ProductResponse(Long id, String name, double price, int stockQuantity, int categoryId,
                           String categoryName, String productDescription, String imageType, byte[] imageData,
                           Long imageId, List<ProductReviewResponse> productReviewList, boolean isInUserWishlist,
                           Long wishlistItemId) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.productDescription = productDescription;
        this.imageType = imageType;
        this.imageData = imageData;
        this.imageId = imageId;
        this.productReviewList = productReviewList;
        this.isInUserWishlist = isInUserWishlist;
        this.wishlistItemId = wishlistItemId;
    }

    public ProductResponse(Long id, String name, double price, int stockQuantity, int categoryId,
                           String categoryName, String productDescription, String imageType, byte[] imageData,
                           Long imageId, List<ProductReviewResponse> productReviewList) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.productDescription = productDescription;
        this.imageType = imageType;
        this.imageData = imageData;
        this.imageId = imageId;
        this.productReviewList = productReviewList;
    }
}
