package com.shoppingsystem.shopping_system.wishlist.service;

import com.shoppingsystem.shopping_system.product.dto.ProductImageDTO;
import com.shoppingsystem.shopping_system.product.model.Product;
import com.shoppingsystem.shopping_system.product.model.ProductImage;
import com.shoppingsystem.shopping_system.product.service.ProductImageService;
import com.shoppingsystem.shopping_system.product.service.ProductService;
import com.shoppingsystem.shopping_system.wishlist.dto.WishlistItemRequest;
import com.shoppingsystem.shopping_system.wishlist.dto.WishlistItemResponse;
import com.shoppingsystem.shopping_system.wishlist.exception.WishlistNotFound;
import com.shoppingsystem.shopping_system.wishlist.model.WishlistItem;
import com.shoppingsystem.shopping_system.wishlist.repository.WishlistItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
        if(userId==null) {
            throw new IllegalArgumentException("User ID must no be null");
        }
        List<WishlistItem> wishlistItemList = wishlistItemRepository.findByUserId(userId);

        if(wishlistItemList == null) {
            throw new WishlistNotFound("Wishlist not found");
        }

        Map<Long, Product> productMap = generateProductMap(wishlistItemList);
        Map<Long, ProductImage> productImageMap = generateProductImage(productMap);

        return wishlistItemList.stream().map(wishlistItem -> {
            Product product = productMap.get(wishlistItem.getProductId());
            ProductImage productImage = productImageMap.get(product.getImage_id());
            return new WishlistItemResponse(
                    wishlistItem.getId(),
                    product.getId(),
                    product.getName(),
                    product.getCategory().getName(),
                    product.getPrice(),
                    productImage.getImageData(),
                    productImage.getType(),
                    wishlistItem.getCreatedAt()
            );
        }).toList();

    }

    private Map<Long, Product> generateProductMap(List<WishlistItem> wishlistItemList) {
        List<Long> productIds = wishlistItemList.stream().map(WishlistItem::getProductId).toList();
        List<Product> productList = productService.findByIds(productIds);
        return productList.stream().collect(Collectors.toMap(Product::getId, product -> product));
    }

    private Map<Long, ProductImage> generateProductImage(Map<Long, Product> productMap) {
        List<Long> imageIds = productMap.values().stream()
                .map(Product::getImage_id)
                .distinct()
                .toList();

        List<ProductImage> productImageList = productImageService.findByIds(imageIds);
        return productImageList.stream().collect(Collectors.toMap(
                ProductImage::getId, productImage -> productImage
        ));
    }

    public void removeWishlistItem(Long id) {
        if(id == null) {
            throw new IllegalArgumentException("Wishlist ID must not be null");
        }
        wishlistItemRepository.deleteById(id);
    }
}
