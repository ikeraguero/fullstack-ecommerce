package com.shoppingsystem.shopping_system.product_review.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductReviewResponse {
    private int rating;
    private String comment;
    private String userFullName;

    public ProductReviewResponse(int rating, String comment, String firstName, String lastName) {
        this.rating = rating;
        this.comment = comment;
        this.userFullName = firstName + " " + lastName;
    }
}
