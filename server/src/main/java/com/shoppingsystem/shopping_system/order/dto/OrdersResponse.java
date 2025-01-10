package com.shoppingsystem.shopping_system.order.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdersResponse {
    private List<OrderResponse> currentContent;
    private List<OrderResponse> previousContent;
    private List<OrderResponse> nextContent;
    private long totalUniqueProducts;
    private long totalOrders;
    private double totalRevenue;
    private int currentPage;
    private int totalPages;
}
