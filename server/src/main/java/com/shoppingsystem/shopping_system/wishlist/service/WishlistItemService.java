package com.shoppingsystem.shopping_system.wishlist.service;

import com.shoppingsystem.shopping_system.wishlist.dto.WishlistItemRequest;
import com.shoppingsystem.shopping_system.wishlist.dto.WishlistItemResponse;

import java.util.List;

public interface WishlistItemService {
    WishlistItemResponse addWishlistItem(WishlistItemRequest request);
    List<WishlistItemResponse> getWishlistItemsByUserId(Long userId);
    void removeWishlistItem(Long id);
//    boolean isProductInWishlist(Long userId, Long productId);
    boolean isProductInWishlist(Long userId, Long productId);
}
