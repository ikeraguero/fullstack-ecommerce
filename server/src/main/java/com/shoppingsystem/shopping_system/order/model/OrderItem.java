package com.shoppingsystem.shopping_system.order.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shoppingsystem.shopping_system.product.model.Product;
import jakarta.persistence.*;

@Entity
@Table(name = "order_item", schema = "ecommerce_project")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long orderItem;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    @JsonIgnore
    private Order order;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_id", referencedColumnName = "product_id")
    @JsonIgnore
    private Product product;

    @Column(name= "price")
    private double price;

    @Column(name="discount")
    private double discount;

    @Column(name = "total_price")
    private double totalPrice;


}
