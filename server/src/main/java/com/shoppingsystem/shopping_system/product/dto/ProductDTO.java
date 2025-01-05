package com.shoppingsystem.shopping_system.product.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.shoppingsystem.shopping_system.config.MultipartFileDeserializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;


@Data
@AllArgsConstructor
public class ProductDTO {

    private Long id;
    private String name;
    private double price;
    private int stockQuantity;
    private int categoryId;
    private String categoryName;
    private String productDescription;
    @JsonDeserialize(using = MultipartFileDeserializer.class)
    private MultipartFile image;

}
