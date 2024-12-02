package com.shoppingsystem.shopping_system.service;

import com.shoppingsystem.shopping_system.model.Category;
import com.shoppingsystem.shopping_system.model.Product;
import com.shoppingsystem.shopping_system.model.ProductImage;
import com.shoppingsystem.shopping_system.repository.ProductImageRepository;
import com.shoppingsystem.shopping_system.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductImageServiceImpl implements ProductImageService {

    private ProductImageRepository productImageRepository;

    @Autowired
    public ProductImageServiceImpl(ProductImageRepository productImageRepository) {
        this.productImageRepository = productImageRepository;
    }

    @Override
    public List<ProductImage> findAll() {
        return this.productImageRepository.findAll();
    }

    @Override
    public ProductImage findById(Long id) {
        Optional<ProductImage> result = productImageRepository.findById(id);
        ProductImage theProductImage = null;
        if(result.isPresent()) {
            theProductImage = result.get();
        } else {
            throw new RuntimeException("Did not find product with id - " + id);
        }
        return theProductImage;
    }

    @Override
    public ProductImage save(ProductImage productImage) {
        return (ProductImage) productImageRepository.save(productImage);
    }

    @Override
    public void deleteById(Long id) {
        productImageRepository.deleteById(id);
    }

    @Override
    public ProductImage uploadImage(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        String fileType = file.getContentType();
        long fileSize = file.getSize();

        byte[] fileBytes = file.getBytes();

        ProductImage productImage = new ProductImage(fileName, fileType, fileSize, fileBytes);

        return (ProductImage) productImageRepository.save(productImage);
    }
}
