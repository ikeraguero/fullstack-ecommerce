package com.shoppingsystem.shopping_system.wishlist.service;

import com.shoppingsystem.shopping_system.product.dto.ProductImageDTO;
import com.shoppingsystem.shopping_system.product.model.Product;
import com.shoppingsystem.shopping_system.product.service.ProductImageService;
import com.shoppingsystem.shopping_system.product.service.ProductService;
import com.shoppingsystem.shopping_system.wishlist.dto.WishlistItemRequest;
import com.shoppingsystem.shopping_system.wishlist.dto.WishlistItemResponse;
import com.shoppingsystem.shopping_system.wishlist.model.WishlistItem;
import com.shoppingsystem.shopping_system.wishlist.repository.WishlistItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class WishlistItemServiceImpl implements WishlistItemService{

    @Autowired
    private final WishlistItemRepository wishlistItemRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductImageService productImageService;

    public WishlistItemServiceImpl(WishlistItemRepository wishlistItemRepository) {
        this.wishlistItemRepository = wishlistItemRepository;
    }


    public WishlistItemResponse addWishlistItem(WishlistItemRequest request) {
        WishlistItem wishlistItem = new WishlistItem();
        wishlistItem.setUserId(request.getUserId());
        wishlistItem.setProductId(request.getProductId());
        WishlistItem savedItem = wishlistItemRepository.save(wishlistItem);
        Product product = productService.findByIdEntity(savedItem.getProductId());
        ProductImageDTO productImage= productImageService.findById(product.getImage_id());
        return new WishlistItemResponse(
                wishlistItem.getId(),
                product.getId(),
                product.getName(),
                product.getCategory().getName(),
                product.getPrice(),
                productImage.getImage_data(),
                productImage.getType(),
                savedItem.getCreatedAt()
        );
    }

    public List<WishlistItemResponse> getWishlistItemsByUserId(Long userId) {
        List<WishlistItem> wishlistItemList = wishlistItemRepository.findByUserId(userId);
        List<WishlistItemResponse> wishlistItemResponseList = new LinkedList<>();
        for(WishlistItem wishlistItem : wishlistItemList) {
            Product product = productService.findByIdEntity(wishlistItem.getProductId());
            ProductImageDTO productImage= productImageService.findById(product.getImage_id());
            WishlistItemResponse wishlistItemResponse = new WishlistItemResponse(
                    wishlistItem.getId(),
                    product.getId(),
                    product.getName(),
                    product.getCategory().getName(),
                    product.getPrice(),
                    productImage.getImage_data(),
                    productImage.getType(),
                    wishlistItem.getCreatedAt()
            );
            wishlistItemResponseList.add(wishlistItemResponse);
        }
        return wishlistItemResponseList;

    }

    public void removeWishlistItem(Long id) {
        wishlistItemRepository.deleteById(id);
    }
}
