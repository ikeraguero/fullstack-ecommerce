package com.shoppingsystem.shopping_system.product.service;

import com.shoppingsystem.shopping_system.product.dto.ProductImageDTO;
import com.shoppingsystem.shopping_system.product.model.ProductImage;
import com.shoppingsystem.shopping_system.product.repository.ProductImageRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@AllArgsConstructor
@Service
public class ProductImageServiceImpl implements ProductImageService {

    @Autowired
    private ProductImageRepository productImageRepository;


    @Override
    public List<ProductImage> findAll() {
        return this.productImageRepository.findAll();
    }



    @Override
    public ProductImageDTO findById(Long id) {
        Optional<ProductImage> result = productImageRepository.findById(id);
        ProductImage theProductImage = null;
        if(result.isPresent()) {
            theProductImage = result.get();
        } else {
            throw new RuntimeException("Did not find product with id - " + id);
        }
        return convertToDTO(theProductImage);
    }

    @Override
    public ProductImage findByIdEntity(Long id) {
        return productImageRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Did not find product image"));
    }

    @Override
    public ProductImage save(ProductImage productImage) {
        return (ProductImage) productImageRepository.save(productImage);
    }

    public Map<Long, ProductImage> findProductImagesByIds(Set<Long> imageIds) {
        List<ProductImage> productImages = productImageRepository.findByIdsSet(imageIds);

        Map<Long, ProductImage> productImageMap = new HashMap<>();
        for (ProductImage productImage : productImages) {
            productImageMap.put(productImage.getId(), productImage);
        }
        return productImageMap;
    }

    @Override
    public void deleteById(Long id) {
        productImageRepository.deleteById(id);
    }

    @Override
    public List<ProductImage> findByIds(List<Long> ids) {
        return productImageRepository.findByIds(ids);
    }

    @Override
    public ProductImage uploadImage(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        String fileType = file.getContentType();
        long fileSize = file.getSize();

        byte[] fileBytes = file.getBytes();

        String base64Image = Base64.getEncoder().encodeToString(fileBytes);
        ProductImage productImage = new ProductImage(fileName, fileType, fileSize, base64Image);

        return (ProductImage) productImageRepository.save(productImage);
    }

    public ProductImageDTO convertToDTO(ProductImage productImage) {
        return new ProductImageDTO(
                productImage.getId(),
                productImage.getType(),
                productImage.getImageData()
        );
    }




}
