package com.shoppingsystem.shopping_system.order.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    private Long userId;
    private double totalPrice;
    private String shippingAddress;
    private double discount;
    private String status;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private Date date;
    private List<OrderItemRequest> cartItemsList;
}
