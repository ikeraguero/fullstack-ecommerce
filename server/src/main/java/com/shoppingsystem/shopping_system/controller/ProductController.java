package com.shoppingsystem.shopping_system.controller;

import com.shoppingsystem.shopping_system.dto.ProductDTO;
import com.shoppingsystem.shopping_system.model.Category;
import com.shoppingsystem.shopping_system.model.Product;
import com.shoppingsystem.shopping_system.repository.CategoryRepository;
import com.shoppingsystem.shopping_system.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    public ProductController() {
    }

    @GetMapping("/products")
    List<ProductDTO> getProducts() {
        return productService.findAll();
    }

    @GetMapping("/products/{productId}")
    ProductDTO getProductById(@PathVariable Long productId) {
        return productService.findById(productId);
    }

    @PostMapping("/products")
    Product addProduct(@RequestBody ProductDTO productDTO) {
        Category category = categoryRepository.findById(productDTO.getCategory_id())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        System.out.println(category.getName());
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setImage_id(productDTO.getImage_id());
        product.setPrice(productDTO.getPrice());
        product.setStock_quantity(productDTO.getStock_quantity());
        product.setProduct_description(productDTO.getProduct_description());
        product.setCategory(category);

        // Save the product
        return productService.save(product);
    }

    @PutMapping("/products")
    Product updateProduct(@RequestBody ProductDTO productDTO) {

        Product existingProduct = productService.findByIdEntity(productDTO.getId()).orElseThrow(() -> new RuntimeException("Product not found!"));

        // Fetch the category
        Category category = categoryRepository.findById(productDTO.getCategory_id())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Update the product fields
        existingProduct.setName(productDTO.getName());
        existingProduct.setImage_id(productDTO.getImage_id());
        existingProduct.setPrice(productDTO.getPrice());
        existingProduct.setStock_quantity(productDTO.getStock_quantity());
        existingProduct.setProduct_description(productDTO.getProduct_description());
        existingProduct.setCategory(category);

        return productService.save(existingProduct); // Save the updated produ
    }

    @DeleteMapping("/products/{productId}")
    void deleteProduct(@PathVariable Long productId) {
        productService.deleteById(productId);
    }

}
