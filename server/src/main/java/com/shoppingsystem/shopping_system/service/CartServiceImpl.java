package com.shoppingsystem.shopping_system.service;

import com.shoppingsystem.shopping_system.dto.CartDTO;
import com.shoppingsystem.shopping_system.dto.CartItemDTO;
import com.shoppingsystem.shopping_system.model.Cart;
import com.shoppingsystem.shopping_system.model.CartItem;
import com.shoppingsystem.shopping_system.model.Product;
import com.shoppingsystem.shopping_system.model.ProductImage;
import com.shoppingsystem.shopping_system.repository.CartItemRepository;
import com.shoppingsystem.shopping_system.repository.CartRepository;
import com.shoppingsystem.shopping_system.repository.ProductImageRepository;
import com.shoppingsystem.shopping_system.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageRepository productImageRepository;


    @Override
    public CartDTO findByUserId(int id) {
        Cart cart = cartRepository.findAll()
                .stream().filter((c) -> c.getUserId() == id).toList().getFirst();

        List<CartItemDTO> cartItemDTOList = new LinkedList<>();

        for(CartItem cartItem : cartItemRepository.findAll()) {
            if(cartItem.getCart().getUserId() == id) {
                Product product = productRepository.findById(cartItem.getProduct().getId())
                        .orElseThrow(() -> new RuntimeException("Product not found"));

                ProductImage productImage = productImageRepository.findById(product.getImage_id()).
                        orElseThrow(()-> new RuntimeException("Image not found"));

                CartItemDTO newCartItemDTO = new CartItemDTO(
                        product.getName(),
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
    public Cart findById(int id) {
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
