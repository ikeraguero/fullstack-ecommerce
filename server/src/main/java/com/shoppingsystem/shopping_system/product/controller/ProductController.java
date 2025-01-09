package com.shoppingsystem.shopping_system.product.controller;

import com.shoppingsystem.shopping_system.category.exceptions.CategoryNotFoundException;
import com.shoppingsystem.shopping_system.category.service.CategoryService;
import com.shoppingsystem.shopping_system.pagination.dto.PaginationResponse;
import com.shoppingsystem.shopping_system.product.dto.ProductRequest;
import com.shoppingsystem.shopping_system.product.dto.ProductResponse;
import com.shoppingsystem.shopping_system.product.exception.NoProductsFoundException;
import com.shoppingsystem.shopping_system.product.model.Product;
import com.shoppingsystem.shopping_system.product.service.ProductImageService;
import com.shoppingsystem.shopping_system.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RequestMapping("/api")
@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductImageService productImageService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    public ProductController() {
    }

    @GetMapping("/products")
    public ResponseEntity<?> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            PaginationResponse paginationResponse = productService.getPaginatedProducts(page, size);
            return ResponseEntity.ok(paginationResponse);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<?> getProductById(@PathVariable Long productId, @RequestHeader("User-ID") Long userId) {
        try {
            ProductResponse productResponse = productService.findById(productId, userId);
            return ResponseEntity.ok(productResponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/products/search")
    public ResponseEntity<?> searchProducts(
            @RequestParam("q") String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            List<ProductResponse> productResponseList = productService.searchProducts(query, page, size);
            return ResponseEntity.ok(productResponseList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/products/categories/{categoryName}")
    public ResponseEntity<?> searchProductsByCategory(@PathVariable String categoryName) {
        try {
            List<ProductResponse> productResponseList = productService.findProductsByCategory(categoryName);
            return ResponseEntity.ok(productResponseList);
        } catch (NoProductsFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }  catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }


    @PostMapping("/products")
    public ResponseEntity<?> addProduct(@RequestParam("image") MultipartFile image,
                                        @RequestPart("product")ProductRequest productRequest) throws IOException {
        try {
            Product savedProduct = productService.addProduct(image, productRequest);
            return ResponseEntity.ok(savedProduct);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to process image"));
        } catch (CategoryNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }


    @PutMapping("/products")
    public ResponseEntity<?> updateProduct(@RequestParam("image") MultipartFile image, @RequestPart("product") ProductRequest productRequest) throws IOException{
        try {
            productService.updateProduct(image, productRequest);
            return ResponseEntity.ok("Product updated successfully");
        } catch (CategoryNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }

    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
        try {
            productService.deleteById(productId);
            return ResponseEntity.ok("Product successfully deleted");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/products/featured")
    public ResponseEntity<?> getFeaturedProducts() {
        try {
            Map<String, List<ProductResponse>> featuredProducts = productService.getRandomCategoryProducts();
            System.out.println(featuredProducts);
            return ResponseEntity.ok(featuredProducts);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

}
