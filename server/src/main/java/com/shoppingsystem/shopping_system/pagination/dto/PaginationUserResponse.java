package com.shoppingsystem.shopping_system.pagination.dto;

import com.shoppingsystem.shopping_system.user.dto.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PaginationUserResponse {
    private List<UserResponse> content;
    private List<UserResponse> contentNext;
    private List<UserResponse> contentPrevious;
    private int currentPage;
    private int totalPages;
    private boolean hasNext;
    private boolean hasPrevious;
}
