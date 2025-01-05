package com.shoppingsystem.shopping_system.product.service;

import com.shoppingsystem.shopping_system.product.dto.ProductImageDTO;
import com.shoppingsystem.shopping_system.product.model.ProductImage;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;


public interface ProductImageService {

    List<ProductImage> findAll();
    ProductImageDTO findById(Long id);
    ProductImage findByIdEntity(Long id);
    ProductImage save(ProductImage product);
    void deleteById(Long id);
    List<ProductImage> findByIds(List<Long> ids);
    ProductImage uploadImage(MultipartFile file) throws IOException;
    Map<Long, ProductImage> findProductImagesByIds(Set<Long> imageIds);
}
