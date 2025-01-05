package com.shoppingsystem.shopping_system.order.service;

import com.shoppingsystem.shopping_system.cart.model.CartItem;
import com.shoppingsystem.shopping_system.cart.service.CartItemService;
import com.shoppingsystem.shopping_system.order.dto.OrderItemResponse;
import com.shoppingsystem.shopping_system.order.dto.OrderRequest;
import com.shoppingsystem.shopping_system.order.dto.OrderResponse;
import com.shoppingsystem.shopping_system.order.exception.OrderNotFoundException;
import com.shoppingsystem.shopping_system.order.model.Order;
import com.shoppingsystem.shopping_system.order.model.OrderItem;
import com.shoppingsystem.shopping_system.order.repository.OrderRepository;
import com.shoppingsystem.shopping_system.product.dto.ProductResponse;
import com.shoppingsystem.shopping_system.product.model.Product;
import com.shoppingsystem.shopping_system.product.model.ProductImage;
import com.shoppingsystem.shopping_system.product.service.ProductImageService;
import com.shoppingsystem.shopping_system.product.service.ProductService;
import com.shoppingsystem.shopping_system.user.model.User;
import com.shoppingsystem.shopping_system.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductImageService productImageService;

    @Autowired
    private UserService userService;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private ProductService productService;

    @Override
    public void save(Order order) {
        orderRepository.save(order);
    }

    @Override
    public Long countItemsInOrder(Long orderId) {
        return orderRepository.countItemsInOrder(orderId);
    }

    @Override
    public OrderResponse findById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Couldn't find order with ID - " + orderId));

        OrderResponse orderResponse = new OrderResponse(order.getOrderId(),
                orderRepository.countItemsInOrder(order.getOrderId()),
                order.getTotalPrice(), order.getDate(), order.getStatus());

        List<OrderItemResponse> orderItemList = findAllOrderItems(orderResponse.getOrderId());
        orderResponse.setOrderItems(orderItemList);
        return orderResponse;
    }

    public Order findByIdEntity(Long orderId) {
        return orderRepository.findById(orderId).orElseThrow(()->new RuntimeException("Couldn't find order"));
    }

    @Override
    public List<OrderItemResponse> findAllOrderItems(Long orderId) {
        List<OrderItem> orderItemList = orderRepository.findAllOrderItems(orderId);
        List<OrderItemResponse> orderItemResponseList = new LinkedList<>();
        for(OrderItem orderItem : orderItemList) {
            ProductImage productImage = productImageService.findByIdEntity(orderItem.getProduct().getId());

            OrderItemResponse orderItemResponse = new OrderItemResponse(orderItem.getOrderItemId(),
                    orderItem.getProduct().getName(), orderItem.getTotalPrice(), orderItem.getQuantity(), productImage.getImageData(),
                    productImage.getType());
            orderItemResponseList.add(orderItemResponse);
        }
        return orderItemResponseList;
    }

    @Override
    public List<OrderItem> findAllOrderItemsEntity(Long orderId) {
        return orderRepository.findAllOrderItems(orderId);
    }

    @Override
    public OrderResponse addOrder(OrderRequest orderRequest) {
        User user = userService.findById(orderRequest.getUserId());

        Order order = new Order(user, orderRequest.getTotalPrice(), orderRequest.getDate(),
                orderRequest.getDiscount(), orderRequest.getShippingAddress());


        orderRepository.save(order);
        createOrderItems(orderRequest, user, order);

        cartItemService.deleteCartItemsByUserId(user.getId());

        return new OrderResponse(order.getOrderId(),
                orderRepository.countItemsInOrder(order.getOrderId()), order.getTotalPrice(), order.getDate(), order.getStatus());
    }

    private void createOrderItems(OrderRequest orderRequest, User user, Order order) {
        List<CartItem> userCurrentCartItems = cartItemService.findCartItemsByUser(user.getId());
        for(CartItem cartItem : userCurrentCartItems) {
            ProductResponse productResponse = productService.findById(cartItem.getProduct().getId(), user.getId());
            Product product = productService.findByIdEntity(productResponse.getId());

            OrderItem orderItem1 = new OrderItem(order, product, cartItem.getPrice(), cartItem.getQuantity(),
                    0, cartItem.getPrice()*cartItem.getQuantity());

            orderItemService.save(orderItem1);
        }
    }

    @Override
    public void updateOrder(Long orderId, OrderRequest orderRequest) {
        Order existingOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Couldn't find order with ID - " + orderId));

        existingOrder.setStatus(orderRequest.getStatus());
        existingOrder.setTotalPrice(orderRequest.getTotalPrice());
        existingOrder.setShippingAddress(orderRequest.getShippingAddress());
        existingOrder.setDate(orderRequest.getDate());
        existingOrder.setDiscount(orderRequest.getDiscount());

        Order updatedOrder = orderRepository.save(existingOrder);

        // update product and removing cart item
        updateProductProperties(existingOrder);
        removeCartItem(existingOrder);

    }

    private void updateProductProperties(Order existingOrder) {
        List<OrderItem> orderItemList = orderRepository.findAllOrderItems(existingOrder.getOrderId());

        List<Long> productsIds = orderItemList.stream().map(orderItem ->
                orderItem.getProduct().getId())
                .toList();

        //batch to avoid multiple database calls
        List<Product> products = productService.findByIds(productsIds);

        Map<Long, Product> productMap = products.stream()
                .collect(Collectors.toMap(Product::getId, product -> product));

        for(OrderItem orderItem : orderItemList) {
            Product product = productMap.get(orderItem.getProduct().getId());

            if (product.getStockQuantity() < orderItem.getQuantity()) {
                throw new IllegalStateException(
                        "Insufficient stock for product ID - " + product.getId()
                );
            }

            product.setStockQuantity(product.getStockQuantity() - orderItem.getQuantity());
        }
        // save all products in batch
        productService.saveAll(products);
    }

    private void removeCartItem(Order existingOrder) {
        List<CartItem> cartItemList = cartItemService.findCartItemsByUser(existingOrder.getUser().getId());
        for(CartItem cartItem : cartItemList) {
            cartItemService.delete(cartItem.getCartItemId());
        }
    }

    @Override
    public List<OrderResponse> findAllOrdersByUser(Long userId) {
        User user = userService.findById(userId);
        List<Order> orderList = orderRepository.findAllOrdersByUser(userId);

        if(orderList.isEmpty()) {
            return Collections.emptyList();
        }

        return orderList.stream()
                .map(order->{
                    OrderResponse orderResponse = createOrderResponse(order);
                    List<OrderItemResponse> orderItems = createOrderItems(order.getOrderId());
                    orderResponse.setOrderItems(orderItems);
                    return orderResponse;
                })
                .toList();
    }

    private OrderResponse createOrderResponse(Order order) {
        return new OrderResponse(order.getOrderId(),
                orderRepository.countItemsInOrder(order.getOrderId()),
                order.getTotalPrice(), order.getDate(), order.getStatus());
    }

    private List<OrderItemResponse> createOrderItems(Long orderId) {
        List<OrderItem> orderItems = orderRepository.findAllOrderItems(orderId);

        List<Long> imageIds = orderItems.stream()
                .filter(orderItem -> orderItem.getProduct() != null)
                .map(orderItem -> orderItem.getProduct().getImageId())
                .toList();

        Map<Long, ProductImage> imageMap = productImageService.findByIds(imageIds).stream()
                .collect(Collectors.toMap(ProductImage::getId, img->img));

        return orderItems.stream()
                .filter(orderItem -> orderItem.getProduct() != null)
                .map(orderItem -> {
                    ProductImage image = imageMap.get(orderItem.getProduct().getImageId());
                    return new OrderItemResponse(orderItem.getOrderItemId(),
                            orderItem.getProduct().getName(),
                            orderItem.getTotalPrice(),
                            orderItem.getQuantity(),
                            image != null ? image.getImageData() : null,
                            image != null ? image.getType() : null);
                }).toList();
    }
}
