package com.shoppingsystem.shopping_system.product.controller;

import com.shoppingsystem.shopping_system.category.model.Category;
import com.shoppingsystem.shopping_system.category.service.CategoryService;
import com.shoppingsystem.shopping_system.product.dto.ProductDTO;
import com.shoppingsystem.shopping_system.product.dto.ProductResponse;
import com.shoppingsystem.shopping_system.product.model.Product;
import com.shoppingsystem.shopping_system.product.model.ProductImage;
import com.shoppingsystem.shopping_system.product.service.ProductImageService;
import com.shoppingsystem.shopping_system.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

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

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/products")
    List<ProductResponse> getProducts() {
        return productService.findAll();
    }

    @GetMapping("/products/{productId}")
    ProductResponse getProductById(@PathVariable Long productId) {
        if (productId == null) {
            throw new IllegalArgumentException("Product ID must not be null");
        }
        return productService.findById(productId);
    }

    @GetMapping("/products/search")
    public List<ProductResponse> searchProducts(@RequestParam String query) {
        return productService.searchProducts(query);
    }

    @GetMapping("/products/categories/{categoryName}")
    public List<ProductResponse> searchProductsByCategory(@PathVariable String categoryName) {
        return productService.findProductsByCategory(categoryName);
    }


    @PostMapping("/products")
    Product addProduct(@RequestParam("image") MultipartFile image, @RequestPart("product") ProductDTO productDTO) throws IOException {
        Category category = categoryService.findById(productDTO.getCategory_id());

        ProductImage productImage = new ProductImage(
                image.getOriginalFilename(), image.getContentType(),
                image.getSize(), image.getBytes()
        );

        productImageService.save(productImage);

        System.out.println(category.getName());
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setImage_id(productImage.getId());
        product.setPrice(productDTO.getPrice());
        product.setStock_quantity(productDTO.getStock_quantity());
        product.setProduct_description(productDTO.getProduct_description());
        product.setCategory(category);

        // save the product
        return productService.save(product);
    }


    @PutMapping("/products")
    Product updateProduct(@RequestParam("image") MultipartFile image, @RequestPart("product") ProductDTO productDTO) throws IOException{

        if (productDTO.getId() == null) {
            throw new IllegalArgumentException("Product ID must not be null");
        }

        ProductImage productImage = new ProductImage(
                image.getOriginalFilename(), image.getContentType(),
                image.getSize(), image.getBytes()
        );

        productImageService.save(productImage);

        Product existingProduct = productService.findByIdEntity(productDTO.getId());

        // Fetch the category
        Category category = categoryService.findById(productDTO.getCategory_id());


        // Update the product fields
        existingProduct.setName(productDTO.getName());
        existingProduct.setPrice(productDTO.getPrice());
        existingProduct.setStock_quantity(productDTO.getStock_quantity());
        existingProduct.setProduct_description(productDTO.getProduct_description());
        existingProduct.setCategory(category);
        existingProduct.setImage_id(productImage.getId());

        return productService.save(existingProduct); // Save the updated produ
    }

    @DeleteMapping("/products/{productId}")
    void deleteProduct(@PathVariable Long productId) {
        productService.deleteById(productId);
    }

}
