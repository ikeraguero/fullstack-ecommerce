package com.shoppingsystem.shopping_system.product.service;

import com.shoppingsystem.shopping_system.product.dto.ProductRequest;
import com.shoppingsystem.shopping_system.product.dto.ProductResponse;
import com.shoppingsystem.shopping_system.product.model.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    void updateProduct(MultipartFile image, ProductRequest productRequest) throws IOException;
    Product addProduct(MultipartFile image, ProductRequest productRequest) throws IOException;
    List<Product> findByIds(List<Long> productsIds);
}
