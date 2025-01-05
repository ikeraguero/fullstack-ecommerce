package com.shoppingsystem.shopping_system.pagination.dto;

import com.shoppingsystem.shopping_system.product.dto.ProductResponse;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PaginationResponse {
    private List<ProductResponse> content;
    private List<ProductResponse> contentNext;
    private List<ProductResponse> contentPrevious;
    private int currentPage;
    private int totalPages;
    private boolean hasNext;
    private boolean hasPrevious;
}
