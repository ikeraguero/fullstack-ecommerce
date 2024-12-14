package com.shoppingsystem.shopping_system.product.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shoppingsystem.shopping_system.category.model.Category;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="product", schema = "ecommerce_project")
public class Product {

    @Id
    @Column(name="product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="product_name")
    private String name;

    @Column(name="product_price")
    private Double price;

    @Column(name="product_stock_quantity")
    private int stock_quantity;

    @Column(name="image_id")
    private Long image_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="category_id", referencedColumnName = "category_id")
    @JsonIgnore
    private Category category;

    @Column(name="product_description")
    private String product_description;
}

