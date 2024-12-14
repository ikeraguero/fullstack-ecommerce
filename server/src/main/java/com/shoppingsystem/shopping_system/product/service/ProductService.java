package com.shoppingsystem.shopping_system.product.service;

import com.shoppingsystem.shopping_system.product.dto.ProductResponse;
import com.shoppingsystem.shopping_system.product.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    List<ProductResponse> findAll();
    ProductResponse findById(Long id);
    Product save(Product product);
    void deleteById(Long id);
    Optional<Product> findByIdEntity(Long id);
}
