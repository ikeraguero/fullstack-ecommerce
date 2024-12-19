package com.shoppingsystem.shopping_system.order.model;

import com.shoppingsystem.shopping_system.product.model.Product;
import jakarta.persistence.*;

@Entity
@Table(name = "order_item", schema = "ecommerce_project")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long orderItem;

    @Column(name = "order_id")
    private Order order;

    @Column(name = "product_id")
    private Product product;

    @Column(name= "price")
    private double price;

    @Column(name="discount")
    private double discount;

    @Column(name = "total_price")
    private double totalPrice;


}
