package com.shoppingsystem.shopping_system.cart.service;

import com.shoppingsystem.shopping_system.cart.dto.CartItemRequest;
import com.shoppingsystem.shopping_system.cart.dto.CartItemResponse;
import com.shoppingsystem.shopping_system.cart.model.Cart;
import com.shoppingsystem.shopping_system.cart.model.CartItem;
import com.shoppingsystem.shopping_system.cart.repository.CartItemRepository;
import com.shoppingsystem.shopping_system.cart.repository.CartRepository;
import com.shoppingsystem.shopping_system.product.model.Product;
import com.shoppingsystem.shopping_system.product.model.ProductImage;
import com.shoppingsystem.shopping_system.product.repository.ProductRepository;
import com.shoppingsystem.shopping_system.product.service.ProductImageService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageService productImageService;

    @Autowired
    private CartRepository cartRepository;

    @Override
    public CartItemResponse findById(Long id) {
        return cartItemRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new EntityNotFoundException("CartItem not found with id - " + id ));
    }

    @Override
    public CartItem save(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    public CartItemResponse convertToDTO(CartItem cartItem) {

        Cart cart = cartRepository.findById(cartItem.getCart().getId())
                .orElseThrow(() -> new EntityNotFoundException("Cart not found with ID - " + cartItem.getCart().getId()));

        Product product = productRepository.findById(cartItem.getProduct().getId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found with ID - " + cartItem.getProduct().getId()));

        ProductImage productImage = productImageService.findByIdEntity(product.getImage_id());

        return new CartItemResponse(
                cartItem.getCartItemId(),
                cart.getId(),
                product.getId(),
                product.getName(),
                product.getCategory().getName(),
                cartItem.getQuantity(),
                cartItem.getPrice(),
                productImage.getImageData(),
                productImage.getType());
    }

    public Optional<CartItem> findByIdEntity(Long id) {
        return cartItemRepository.findById(id);
    }

    public CartItem findCartItemByCartAndProduct(Long cartId, Long productId) {
        return cartItemRepository.findCartItemByCartAndProduct(cartId, productId);
    }

    @Override
    public void delete(Long cartItemId) {
       if(!cartItemRepository.existsById(cartItemId)) {
           throw new EntityNotFoundException("CartItem with ID " + cartItemId + " not found");
       }
       cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public List<CartItem> findCartItemsByUser(Long userId) {
        return cartItemRepository.findCartItemsByUser(userId);
    }

    @Transactional
    @Override
    public void deleteCartItemsByUserId(Long userId) {
        cartItemRepository.deleteCartItemsByUserId(userId);
    }

    @Override
    public List<CartItem> findByCartId(Long cartId) {
        System.out.println(cartId);
        return cartItemRepository.findByCartId(cartId);
    }

    @Override
    public List<CartItem> findAll() {
        return cartItemRepository.findAll();
    }

    @Override
    public CartItemResponse addCartItem(CartItemRequest cartItemRequest) {
        Cart cart = cartRepository.findById(cartItemRequest.getCart_id())
                .orElseThrow(() -> new EntityNotFoundException("Cart not found with ID - "
                        + cartItemRequest.getCart_id()));
        if(cart == null) {
            throw new EntityNotFoundException("Cart not found with ID - " + cartItemRequest.getCart_id());
        }

        Product product = productRepository.findById(cartItemRequest.getProduct_id())
                .orElseThrow(() -> new EntityNotFoundException("Product not found with ID - " + cartItemRequest.getProduct_id()));


        //check if product is already in users cart
        CartItem existingCartItem = cartItemRepository.findCartItemByCartAndProduct(cart.getId(), product.getId());
        if(existingCartItem != null) {
            existingCartItem.setQuantity(cartItemRequest.getQuantity() + existingCartItem.getQuantity());
            existingCartItem.setPrice(cartItemRequest.getPrice());
            return convertToDTO(cartItemRepository.save(existingCartItem));
        }

        CartItem newCartItem = new CartItem();
        newCartItem.setPrice(cartItemRequest.getPrice());
        newCartItem.setQuantity(cartItemRequest.getQuantity());
        newCartItem.setProduct(product);
        newCartItem.setCart(cart);

        return convertToDTO(cartItemRepository.save(newCartItem));
    }

    @Override
    public CartItemResponse updateCartItem(CartItemRequest cartItemRequest) {

        if(cartItemRequest.getCart_id() == null || cartItemRequest.getProduct_id() == null) {
            throw new IllegalArgumentException("Cart ID and Product ID must not be null");
        }

        CartItem cartItem = cartItemRepository.findCartItemByCartAndProduct(cartItemRequest.getCart_id(),
                cartItemRequest.getProduct_id());

        if(cartItem==null) {
            throw new EntityNotFoundException("CartItem not found for Cart ID: " + cartItemRequest.getCart_id() +
                    " and Product ID: " + cartItemRequest.getProduct_id());
        }

        cartItem.setQuantity(cartItemRequest.getQuantity());
        return convertToDTO(cartItemRepository.save(cartItem));
    }


}
