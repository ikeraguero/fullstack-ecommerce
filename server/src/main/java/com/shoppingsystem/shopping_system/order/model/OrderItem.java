package com.shoppingsystem.shopping_system.order.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shoppingsystem.shopping_system.product.model.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order_item", schema = "ecommerce_project")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private Long orderItemId;

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

    @Column(name = "quantity")
    private int quantity;

    @Column(name="discount")
    private double discount;

    @Column(name = "total_price")
    private double totalPrice;

    public OrderItem(Order order, Product product, double price, int quantity, double discount, double totalPrice) {
        this.order = order;
        this.product = product;
        this.price = price;
        this.quantity = quantity;
        this.discount = discount;
        this.totalPrice = totalPrice;
    }
}
