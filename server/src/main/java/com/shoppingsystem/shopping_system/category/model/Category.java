package com.shoppingsystem.shopping_system.category.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shoppingsystem.shopping_system.product.model.Product;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@Entity
@Table(name="category", schema = "ecommerce_project")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private int id;

    @Column(name= "category_name")
    private String name;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<Product> products;
}
