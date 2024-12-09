package com.shoppingsystem.shopping_system.product.controller;

import com.shoppingsystem.shopping_system.product.dto.ProductImageDTO;
import com.shoppingsystem.shopping_system.product.model.ProductImage;
import com.shoppingsystem.shopping_system.product.service.ProductImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/images")
public class ProductImageController {

    private ProductImageService productImageService;

    @Autowired
    public ProductImageController(ProductImageService productImageService) {
        this.productImageService = productImageService;
    }

    @GetMapping("/{imageId}")
    public ProductImageDTO getImageById(@PathVariable Long imageId) {
        return productImageService.findById(imageId);
    }

    @PostMapping("/upload")
    @ResponseStatus(HttpStatus.CREATED)
    public ProductImage uploadImage(@RequestParam("image")MultipartFile file) throws IOException {
        return productImageService.uploadImage(file);
    }
}
