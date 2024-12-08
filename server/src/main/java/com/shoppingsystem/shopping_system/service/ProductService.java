package com.shoppingsystem.shopping_system.service;

import com.shoppingsystem.shopping_system.dto.ProductDTO;
import com.shoppingsystem.shopping_system.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    List<ProductDTO> findAll();
    ProductDTO findById(Long id);
    Product save(Product product);
    void deleteById(Long id);
    Optional<Product> findByIdEntity(Long id);
}
