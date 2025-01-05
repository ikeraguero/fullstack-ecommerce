package com.shoppingsystem.shopping_system.product.service;

import com.shoppingsystem.shopping_system.pagination.dto.PaginationResponse;
import com.shoppingsystem.shopping_system.product.dto.ProductRequest;
import com.shoppingsystem.shopping_system.product.dto.ProductResponse;
import com.shoppingsystem.shopping_system.product.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface ProductService {

    Page<ProductResponse> findAll(int page, int size);
    ProductResponse findById(Long productId, Long userId);
    List<ProductResponse> findProductsByCategory(String categoryName);
    Product save(Product product);
    void saveAll(List<Product> productList);
    void deleteById(Long id);
    Product findByIdEntity(Long id);
    void updateProduct(MultipartFile image, ProductRequest productRequest) throws IOException;
    Product addProduct(MultipartFile image, ProductRequest productRequest) throws IOException;
    List<Product> findByIds(List<Long> productsIds);
    public Map<String, List<ProductResponse>> getRandomCategoryProducts();
    List<ProductResponse> getRandomProductsByCategory(int categoryId);
    PaginationResponse getPaginatedProducts(int page, int size);
    List<ProductResponse> searchProducts(String query, int page, int size);
}
