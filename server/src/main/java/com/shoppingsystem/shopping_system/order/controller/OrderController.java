package com.shoppingsystem.shopping_system.order.controller;

import com.shoppingsystem.shopping_system.category.model.Category;
import com.shoppingsystem.shopping_system.category.service.CategoryService;
import com.shoppingsystem.shopping_system.order.dto.OrderItemRequest;
import com.shoppingsystem.shopping_system.order.dto.OrderRequest;
import com.shoppingsystem.shopping_system.order.dto.OrderResponse;
import com.shoppingsystem.shopping_system.order.model.Order;
import com.shoppingsystem.shopping_system.order.model.OrderItem;
import com.shoppingsystem.shopping_system.order.service.OrderItemService;
import com.shoppingsystem.shopping_system.order.service.OrderService;
import com.shoppingsystem.shopping_system.payment.service.PaymentService;
import com.shoppingsystem.shopping_system.product.dto.ProductResponse;
import com.shoppingsystem.shopping_system.product.model.Product;
import com.shoppingsystem.shopping_system.product.service.ProductImageService;
import com.shoppingsystem.shopping_system.product.service.ProductService;
import com.shoppingsystem.shopping_system.user.model.User;
import com.shoppingsystem.shopping_system.user.service.UserService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private ProductImageService productImageService;

    @PostMapping("/order")
    ResponseEntity<OrderResponse> saveOrder(@RequestBody OrderRequest orderRequest) throws StripeException {

        System.out.println(orderRequest.toString());
        User user = userService.findById(orderRequest.getUserId());

        Order order = new Order(user, orderRequest.getTotalPrice(), orderRequest.getDate(),
                orderRequest.getDiscount(), orderRequest.getShippingAddress());


       orderService.save(order);

        for(OrderItemRequest orderItem : orderRequest.getCartItemsList()) {
        ProductResponse productResponse = productService.findById(orderItem.getProductId());
            Category category = categoryService.findById(productResponse.getCategory_id());
            Product product = new Product(productResponse.getId(), productResponse.getName(), productResponse.getPrice(),
                    productResponse.getStock_quantity(),
                    productResponse.getImage_id(), category, productResponse.getProduct_description());

            OrderItem orderItem1 = new OrderItem(order, product, orderItem.getTotalPrice(), orderItem.getQuantity(),
                    0, orderItem.getTotalPrice());

            orderItemService.save(orderItem1);
        }

       OrderResponse orderResponse = new OrderResponse(order.getOrderId(), orderService.countItemsInOrder(order.getOrderId()), order.getTotalPrice());


       return new ResponseEntity<>(orderResponse, HttpStatus.CREATED);
    }
}
