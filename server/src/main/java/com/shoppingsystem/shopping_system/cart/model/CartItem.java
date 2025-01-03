package com.shoppingsystem.shopping_system.cart.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.shoppingsystem.shopping_system.product.model.Product;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="cart_item", schema = "ecommerce_project")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="cart_item_id")
    private Long cartItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="cart_id", referencedColumnName = "cart_id")
    @JsonIgnoreProperties("cartItems")
    private Cart cart;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_id", referencedColumnName = "product_id")
    @JsonIgnore
    private Product product;

    @Column(name = "price")
    private double price;

    @Column(name="quantity")
    private int quantity;
}
