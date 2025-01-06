package com.shoppingsystem.shopping_system.wishlist.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WishlistItemResponse {
    private Long id;
    private Long productId;
    private String productName;
    private String productCategory;
    private double productPrice;
    private String productImageData;
    private String productImageType;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date createdAt;
}
