package com.shoppingsystem.shopping_system.product.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shoppingsystem.shopping_system.category.model.Category;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
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
    private int stockQuantity;

    @Column(name="image_id")
    private Long imageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="category_id", referencedColumnName = "category_id")
    @JsonIgnore
    @ToString.Exclude
    private Category category;

    @Column(name="product_description")
    private String productDescription;

    public Product(Long id, String name, Double price, int stockQuantity, Long imageId, Category category, String productDescription) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.imageId = imageId;
        this.category = category;
        this.productDescription = productDescription;
    }
}

