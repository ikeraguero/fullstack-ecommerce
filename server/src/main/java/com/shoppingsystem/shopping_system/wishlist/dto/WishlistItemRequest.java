package com.shoppingsystem.shopping_system.wishlist.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WishlistItemRequest {
    private Long userId;
    private Long productId;
}
