package com.shoppingsystem.shopping_system.cart.service;

import com.shoppingsystem.shopping_system.cart.dto.CartItemResponse;
import com.shoppingsystem.shopping_system.cart.dto.CartResponse;
import com.shoppingsystem.shopping_system.cart.model.Cart;
import com.shoppingsystem.shopping_system.cart.model.CartItem;
import com.shoppingsystem.shopping_system.cart.repository.CartRepository;
import com.shoppingsystem.shopping_system.product.model.Product;
import com.shoppingsystem.shopping_system.product.model.ProductImage;
import com.shoppingsystem.shopping_system.product.service.ProductImageService;
import com.shoppingsystem.shopping_system.product.service.ProductService;
import com.shoppingsystem.shopping_system.user.model.User;
import com.shoppingsystem.shopping_system.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductImageService productImageService;

    @Autowired
    private UserService userService;


    @Override
    public Boolean isProductInUserCart(Long userId, Long productId) {
        if(userId == null || productId == null) {
            throw new IllegalArgumentException("User ID and Product ID must not be null");
        }

        return cartRepository.isProductInUserCart(userId, productId);
    }

    @Override
    public CartResponse findByUserId(Long id) {
        Cart cart = cartRepository.findByUserId(id).orElseGet(() -> createNewCart(id));
        List<CartItemResponse> cartItemResponseList = getCartItemsForCart(cart);

        return new CartResponse(cart.getId(), cartItemResponseList);
    }

    private Cart createNewCart(Long userId) {
        User user = userService.findById(userId);
        Cart cart = new Cart("active", user);
        return cartRepository.save(cart);
    }

    private List<CartItemResponse> getCartItemsForCart(Cart cart) {
        List<CartItem> cartItems = cartItemService.findByCartId(cart.getId());
        List<CartItemResponse> cartItemResponseList = new LinkedList<>();

        for(CartItem cartItem : cartItems) {
            Product product = productService.findByIdEntity(cartItem.getProduct().getId());

            ProductImage productImage = productImageService.findByIdEntity(product.getImage_id());

            CartItemResponse cartItemResponse = new CartItemResponse(
                    cartItem.getCartItemId(),
                    cart.getId(),
                    product.getId(),
                    product.getName(),
                    product.getCategory().getName(),
                    cartItem.getQuantity(),
                    cartItem.getPrice(),
                    productImage.getImageData(),
                    productImage.getType());

            cartItemResponseList.add(cartItemResponse);
        }
        return cartItemResponseList;
    }

    @Override
    public Cart findById(Long id) {
        Optional<Cart> result = cartRepository.findById(id);
        Cart theCart = null;
        if(result.isPresent()) {
            theCart = result.get();
        } else {
            throw new RuntimeException("Did not find product with id - " + id);
        }
        return theCart;
    }

    @Override
    public Cart save(Cart cart) {
        if(cart == null || cart.getUser() == null) {
            throw new IllegalArgumentException("Cart or associated user must not be null");
        }
        return cartRepository.save(cart);
    }
}
