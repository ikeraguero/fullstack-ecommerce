package com.shoppingsystem.shopping_system.cart.service;

import com.shoppingsystem.shopping_system.cart.dto.CartItemDTO;
import com.shoppingsystem.shopping_system.cart.model.Cart;
import com.shoppingsystem.shopping_system.cart.model.CartItem;
import com.shoppingsystem.shopping_system.product.model.Product;
import com.shoppingsystem.shopping_system.product.model.ProductImage;
import com.shoppingsystem.shopping_system.cart.repository.CartItemRepository;
import com.shoppingsystem.shopping_system.cart.repository.CartRepository;
import com.shoppingsystem.shopping_system.product.repository.ProductImageRepository;
import com.shoppingsystem.shopping_system.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private CartRepository cartRepository;

    @Override
    public CartItemDTO findById(Long id) {
        Optional<CartItem> result = cartItemRepository.findById(id);
        CartItem theCartItem = null;
        if(result.isPresent()) {
            theCartItem = result.get();
        } else {
            throw new RuntimeException("Did not find product with id - " + id);
        }
        return convertToDTO(theCartItem);
    }

    @Override
    public CartItem save(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    public CartItemDTO convertToDTO(CartItem cartItem) {

        Cart cart = cartRepository.findById(cartItem.getCart().getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        Product product = productRepository.findById(cartItem.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        ProductImage productImage = productImageRepository.findById(product.getImage_id()).
                orElseThrow(()-> new RuntimeException("Image not found"));

        return new CartItemDTO(
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
        cartItemRepository.deleteById(cartItemId);
    }
}
