package com.shoppingsystem.shopping_system.service;

import com.shoppingsystem.shopping_system.dto.ProductImageDTO;
import com.shoppingsystem.shopping_system.model.Product;
import com.shoppingsystem.shopping_system.model.ProductImage;
import com.shoppingsystem.shopping_system.repository.ProductImageRepository;
import com.shoppingsystem.shopping_system.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


public interface ProductImageService {

    List<ProductImage> findAll();
    ProductImageDTO findById(Long id);
    ProductImage save(ProductImage product);
    void deleteById(Long id);
    ProductImage uploadImage(MultipartFile file) throws IOException;
}
