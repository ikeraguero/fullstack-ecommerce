package com.shoppingsystem.shopping_system.wishlist.controller;

import com.shoppingsystem.shopping_system.wishlist.dto.WishlistItemRequest;
import com.shoppingsystem.shopping_system.wishlist.dto.WishlistItemResponse;
import com.shoppingsystem.shopping_system.wishlist.exception.WishlistNotFound;
import com.shoppingsystem.shopping_system.wishlist.service.WishlistItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistItemController {

    private final WishlistItemService wishlistItemService;

    public WishlistItemController(WishlistItemService service) {
        this.wishlistItemService = service;
    }

    @PostMapping
    public ResponseEntity<?> addWishlistItem(@RequestBody WishlistItemRequest request) {
        try {
            WishlistItemResponse response = wishlistItemService.addWishlistItem(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e ) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getWishlistItems(@PathVariable Long userId) {
        try {
            List<WishlistItemResponse> items = wishlistItemService.getWishlistItemsByUserId(userId);
            return ResponseEntity.ok(items);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (WishlistNotFound e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e ) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeWishlistItem(@PathVariable Long id) {
        try {
            wishlistItemService.removeWishlistItem(id);
            return ResponseEntity.ok("Wishlist Item successfully removed");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
