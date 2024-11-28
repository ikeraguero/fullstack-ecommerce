package com.shoppingsystem.shopping_system.model;

import jakarta.persistence.*;

@Entity
@Table(name="product", schema = "ecommerce_project")
public class Product {

    @Id
    @Column(name="product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="product_name")
    private String name;

    @Column(name="product_price")
    private Double price;

    @Column(name="product_stock_quantity")
    private int stock_quantity;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public int getStock_quantty() {
        return stock_quantity;
    }

    public void setStock_quantity(int stock_quantiy) {
        this.stock_quantity = stock_quantiy;
    }
}
