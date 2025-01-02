package com.shoppingsystem.shopping_system.wishlist.dto;

import lombok.Data;

@Data
public class WishlistItemRequest {
    private Long userId;
    private Long productId;
}
