package com.shoppingsystem.shopping_system.product_review.service;

import com.shoppingsystem.shopping_system.order.service.OrderItemService;
import com.shoppingsystem.shopping_system.product.exception.ProductNotFoundException;
import com.shoppingsystem.shopping_system.product.model.Product;
import com.shoppingsystem.shopping_system.product.repository.ProductRepository;
import com.shoppingsystem.shopping_system.product_review.dto.ProductReviewRequest;
import com.shoppingsystem.shopping_system.product_review.dto.ProductReviewResponse;
import com.shoppingsystem.shopping_system.product_review.model.ProductReview;
import com.shoppingsystem.shopping_system.product_review.repository.ProductReviewRepository;
import com.shoppingsystem.shopping_system.user.exception.UserNotFoundException;
import com.shoppingsystem.shopping_system.user.model.User;
import com.shoppingsystem.shopping_system.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.LinkedList;
import java.util.List;

@Service
public class ProductReviewImpl implements ProductReviewService{

    @Autowired
    private ProductReviewRepository productReviewRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderItemService orderItemService;

    @Override
    public List<ProductReviewResponse> findAllReviewsByProduct(Long productId) {
        List<ProductReview> productReviewList = productReviewRepository.findAllReviewsByProduct(productId);
        List<ProductReviewResponse> productReviewResponseList = new LinkedList<>();
        for(ProductReview productReview : productReviewList) {
            LocalDateTime dateTime = productReview.getDate().toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime();
            User user = userService.findById(productReview.getUser().getId());
            ProductReviewResponse productReviewResponse = new ProductReviewResponse(productReview.getProduct()
                    .getId(),
                    productReview.getRating(),
                    productReview.getComment(), user.getFirstName(), user.getLastName(), dateTime);
            productReviewResponseList.add(productReviewResponse);
        }
        return productReviewResponseList;
    }

    @Transactional
    @Override
    public void saveReview(ProductReviewRequest productReviewRequest) {
        validateReviewRequest(productReviewRequest);

        try {
            Product product = productRepository.findById(productReviewRequest.getProductId())
                    .orElseThrow(() -> new ProductNotFoundException("Couldn't find product with ID - "
                            + productReviewRequest.getProductId()));
            User user = userService.findById(productReviewRequest.getUserId());

            if (product == null) {
                throw new ProductNotFoundException("Product not found with ID: " + productReviewRequest
                        .getProductId());
            }

            if (user == null) {
                throw new UserNotFoundException("User not found with ID: " + productReviewRequest.getUserId());
            }

            ProductReview productReview = new ProductReview(
                    product,
                    user,
                    productReviewRequest.getRating(),
                    productReviewRequest.getComment(),
                    productReviewRequest.getDate()
            );
            productReviewRepository.save(productReview);
        } catch (Exception e) {

            throw new RuntimeException("Error saving product review: " + e.getMessage());
        }
    }

    @Override
    public boolean existsByProductIdAndUserId(Long productId, Long userId) {
        return productReviewRepository.existsByProductIdAndUserId(productId, userId);
    }

    private void validateReviewRequest(ProductReviewRequest productReviewRequest) {
        if (productReviewRequest.getRating() < 1 || productReviewRequest.getRating() > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }
        if (productReviewRequest.getComment() == null || productReviewRequest.getComment().isEmpty()) {
            throw new IllegalArgumentException("Comment cannot be empty");
        }
        if (productReviewRequest.getDate() == null) {
            throw new IllegalArgumentException("Review date cannot be null");
        }
    }

    @Override
    public List<ProductReview> findReviewByProductsId(List<Long> productsId) {
        return productReviewRepository.findReviewByProductsId(productsId);
    }
}
