package com.shoppingsystem.shopping_system.product_review.controller;

import com.shoppingsystem.shopping_system.product.service.ProductService;
import com.shoppingsystem.shopping_system.product_review.dto.ProductReviewRequest;
import com.shoppingsystem.shopping_system.product_review.service.ProductReviewService;
import com.shoppingsystem.shopping_system.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProductReviewController {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductReviewService productReviewService;

    @PostMapping("/review")
    public ResponseEntity<?> saveReview(@RequestBody ProductReviewRequest productReviewRequest) {
        try {
            System.out.println(productReviewRequest);
            productReviewService.saveReview(productReviewRequest);
            return ResponseEntity.ok("Review created successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
