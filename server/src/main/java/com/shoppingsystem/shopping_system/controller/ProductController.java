package com.shoppingsystem.shopping_system.controller;

import com.shoppingsystem.shopping_system.model.Product;
import com.shoppingsystem.shopping_system.service.ProductService;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@RestController
public class ProductController {

    ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    public ProductController() {
    }

    @GetMapping("/products")
    List<Product> getProducts() {
        return productService.findAll();
    }

    @PostMapping("/products")
    Product addProduct(@RequestBody Product product) {
        System.out.println(product.toString());
        return productService.save(product);
    }

    @PutMapping("/products")
    Product updateProduct(@RequestBody Product product) {
        return productService.save(product);
    }

    @DeleteMapping("/products/{productId}")
    void deleteProduct(@PathVariable int productId) {
        productService.deleteById(productId);
    }

}
