package com.shoppingsystem.shopping_system.product.service;

import com.shoppingsystem.shopping_system.product.dto.ProductResponse;
import com.shoppingsystem.shopping_system.product.model.Product;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductService {

    @Query

    List<ProductResponse> findAll();
    ProductResponse findById(Long id);
    List<ProductResponse> findProductsByCategory(String categoryName);
    Product save(Product product);
    List<ProductResponse>  searchProducts(String query);
    void deleteById(Long id);
    Product findByIdEntity(Long id);
}
