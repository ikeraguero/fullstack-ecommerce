package com.shoppingsystem.shopping_system.product_review.service;

import com.shoppingsystem.shopping_system.product_review.dto.ProductReviewResponse;
import com.shoppingsystem.shopping_system.product_review.model.ProductReview;
import com.shoppingsystem.shopping_system.product_review.repository.ProductReviewRepository;
import com.shoppingsystem.shopping_system.user.model.User;
import com.shoppingsystem.shopping_system.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class ProductReviewImpl implements ProductReviewService{

    @Autowired
    private ProductReviewRepository productReviewRepository;

    @Autowired
    private UserService userService;

    @Override
    public List<ProductReviewResponse> findAllReviewsByProduct(Long productId) {
        List<ProductReview> productReviewList = productReviewRepository.findAllReviewsByProduct(productId);
        List<ProductReviewResponse> productReviewResponseList = new LinkedList<>();
        for(ProductReview productReview : productReviewList) {
            User user = userService.findById(productReview.getUser().getId());
            ProductReviewResponse productReviewResponse = new ProductReviewResponse(productReview.getRating(),
                    productReview.getComment(), user.getFirstName(), user.getLastName());
            productReviewResponseList.add(productReviewResponse);
        }
        return productReviewResponseList;
    }
}
