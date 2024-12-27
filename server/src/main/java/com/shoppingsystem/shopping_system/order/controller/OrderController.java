package com.shoppingsystem.shopping_system.order.controller;

import com.shoppingsystem.shopping_system.cart.model.CartItem;
import com.shoppingsystem.shopping_system.cart.service.CartItemService;
import com.shoppingsystem.shopping_system.category.service.CategoryService;
import com.shoppingsystem.shopping_system.order.dto.OrderItemRequest;
import com.shoppingsystem.shopping_system.order.dto.OrderItemResponse;
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
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

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
    private CartItemService cartItemService;

    @Autowired
    private ProductImageService productImageService;

    @GetMapping("/order/{orderId}")
    ResponseEntity<OrderResponse> findOrder(@PathVariable Long orderId) {
        return orderService.findById(orderId);
    }

    @PostMapping("/order")
    ResponseEntity<OrderResponse> saveOrder(@RequestBody OrderRequest orderRequest) throws StripeException {

        System.out.println(orderRequest.toString());
        User user = userService.findById(orderRequest.getUserId());

        Order order = new Order(user, orderRequest.getTotalPrice(), orderRequest.getDate(),
                orderRequest.getDiscount(), orderRequest.getShippingAddress());


       orderService.save(order);

        for(OrderItemRequest orderItem : orderRequest.getCartItemsList()) {
        ProductResponse productResponse = productService.findById(orderItem.getProductId(), user.getId());
            Product product = productService.findByIdEntity(productResponse.getId());

            OrderItem orderItem1 = new OrderItem(order, product, orderItem.getTotalPrice(), orderItem.getQuantity(),
                    0, orderItem.getTotalPrice());

            orderItemService.save(orderItem1);
        }

       OrderResponse orderResponse = new OrderResponse(order.getOrderId(),
               orderService.countItemsInOrder(order.getOrderId()), order.getTotalPrice(), order.getDate(), order.getStatus());


       return new ResponseEntity<>(orderResponse, HttpStatus.CREATED);
    }

    @PutMapping("/order/{orderId}")
    public void updateOrder(@PathVariable Long orderId, @RequestBody OrderRequest orderRequest) {
        Order existingOrder = orderService.findByIdEntity(orderId);

        existingOrder.setStatus(orderRequest.getStatus());
        existingOrder.setTotalPrice(orderRequest.getTotalPrice());
        existingOrder.setShippingAddress(orderRequest.getShippingAddress());
        existingOrder.setDate(orderRequest.getDate());
        existingOrder.setDiscount(orderRequest.getDiscount());

        orderService.save(existingOrder);

        // update product and removing cart item
        List<OrderItem> orderItemList = orderService.findAllOrderItemsEntity(existingOrder.getOrderId());
        List<CartItem> cartItemList = cartItemService.findCartItemsByUser(existingOrder.getUser().getId());
            System.out.println(existingOrder.getUser().getId());
        for(CartItem cartItem : cartItemList) {
            cartItemService.delete(cartItem.getCartItemId());
        }
        for(OrderItem orderItem : orderItemList) {
            Product existingProduct = productService.findByIdEntity(orderItem.getProduct().getId());
            existingProduct.setStock_quantity(existingProduct.getStock_quantity() - orderItem.getQuantity());
            productService.save(existingProduct);

        }

    }

    @GetMapping("/orders/user/{userId}")
    public List<OrderResponse> getOrdersByUser(@PathVariable Long userId) {
        List<Order> orderList = orderService.findAllOrdersByUser(userId);
        List<OrderResponse>  orderResponseList = new LinkedList<>();
        for(Order order : orderList) {
            OrderResponse orderResponse = new OrderResponse(order.getOrderId(),
                    orderService.countItemsInOrder(order.getOrderId()),
                    order.getTotalPrice(), order.getDate(), order.getStatus());
            List<OrderItemResponse> orderItemList = orderService.findAllOrderItems(orderResponse.getOrderId());
            orderResponse.setOrderItems(orderItemList);
            orderResponseList.add(orderResponse);
        }
        return orderResponseList;

    }
}

