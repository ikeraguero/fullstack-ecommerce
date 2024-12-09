package com.shoppingsystem.shopping_system.cart.service;

import com.shoppingsystem.shopping_system.cart.dto.CartDTO;
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

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageRepository productImageRepository;


    @Override
    public Boolean isProductInUserCart(Long userId, Long productId) {
        return cartRepository.isProductInUserCart(userId, productId);
    }

    @Override
    public CartDTO findByUserId(Long id) {
        Cart cart = cartRepository.findByUserId(id);

        // if no cart is found, create a new one for the user
        if(cart == null) {
            cart = new Cart(null, "active",
                    id);
            cartRepository.save(cart);
        }

        List<CartItemDTO> cartItemDTOList = new LinkedList<>();

        for(CartItem cartItem : cartItemRepository.findAll()) {
            if(cartItem.getCart().getUserId().equals(id)) {
                Product product = productRepository.findById(cartItem.getProduct().getId())
                        .orElseThrow(() -> new RuntimeException("Product not found"));

                ProductImage productImage = productImageRepository.findById(product.getImage_id()).
                        orElseThrow(()-> new RuntimeException("Image not found"));

                CartItemDTO newCartItemDTO = new CartItemDTO(
                        cartItem.getCartItemId(),
                        cart.getId(),
                        product.getId(),
                        product.getName(),
                        product.getCategory().getName(),
                        cartItem.getQuantity(),
                        cartItem.getPrice(),
                        productImage.getImageData(),
                        productImage.getType());

                cartItemDTOList.add(newCartItemDTO);
            }

        }
        return new CartDTO(
                cart.getId(),
                cartItemDTOList
            );

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
        return cartRepository.save(cart);
    }
}
