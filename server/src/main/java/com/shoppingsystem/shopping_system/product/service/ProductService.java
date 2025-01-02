package com.shoppingsystem.shopping_system.product.service;

import com.shoppingsystem.shopping_system.product.dto.ProductResponse;
import com.shoppingsystem.shopping_system.product.model.Product;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductService {

    @Query

    List<ProductResponse> findAll();
    ProductResponse findById(Long productId, Long userId);
    List<ProductResponse> findProductsByCategory(String categoryName);
    Product save(Product product);
    void saveAll(List<Product> productList);
    List<ProductResponse>  searchProducts(String query);
    void deleteById(Long id);
    Product findByIdEntity(Long id);

    List<Product> findByIds(List<Long> productsIds);
}
