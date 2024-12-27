package com.shoppingsystem.shopping_system.product_review.controller;

import com.shoppingsystem.shopping_system.product.service.ProductService;
import com.shoppingsystem.shopping_system.product_review.dto.ProductReviewRequest;
import com.shoppingsystem.shopping_system.product_review.model.ProductReview;
import com.shoppingsystem.shopping_system.product_review.service.ProductReviewService;
import com.shoppingsystem.shopping_system.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
    void saveReview(@RequestBody ProductReviewRequest productReviewRequest) {
        System.out.println(productReviewRequest);
        ProductReview productReview = new ProductReview(
                productService.findByIdEntity(productReviewRequest.getProductId()),
                userService.findById(productReviewRequest.getUserId()),
                productReviewRequest.getRating(),
                productReviewRequest.getComment(),
                productReviewRequest.getDate()
        );

        productReviewService.save(productReview);

    }
}
