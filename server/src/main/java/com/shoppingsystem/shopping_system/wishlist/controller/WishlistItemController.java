package com.shoppingsystem.shopping_system.wishlist.controller;

import com.shoppingsystem.shopping_system.wishlist.dto.WishlistItemRequest;
import com.shoppingsystem.shopping_system.wishlist.dto.WishlistItemResponse;
import com.shoppingsystem.shopping_system.wishlist.service.WishlistItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistItemController {

    private final WishlistItemService service;

    public WishlistItemController(WishlistItemService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<WishlistItemResponse> addWishlistItem(@RequestBody WishlistItemRequest request) {
        WishlistItemResponse response = service.addWishlistItem(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<WishlistItemResponse>> getWishlistItems(@PathVariable Long userId) {
        List<WishlistItemResponse> items = service.getWishlistItemsByUserId(userId);
        System.out.println(items);
        return ResponseEntity.ok(items);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeWishlistItem(@PathVariable Long id) {
        service.removeWishlistItem(id);
        return ResponseEntity.noContent().build();
    }
}
