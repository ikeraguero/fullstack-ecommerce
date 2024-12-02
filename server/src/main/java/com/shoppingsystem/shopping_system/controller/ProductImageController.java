package com.shoppingsystem.shopping_system.controller;

import com.shoppingsystem.shopping_system.model.ProductImage;
import com.shoppingsystem.shopping_system.service.ProductImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
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
    public ProductImage getImageById(@PathVariable Long imageId) {
        return productImageService.findById(imageId);
    }

    @PostMapping("/upload")
    @ResponseStatus(HttpStatus.CREATED)
    public ProductImage uploadImage(@RequestParam("image")MultipartFile file) throws IOException {
        return productImageService.uploadImage(file);
    }
}
