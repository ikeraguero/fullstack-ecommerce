package com.shoppingsystem.shopping_system.product.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="product_image", schema = "ecommerce_project")
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "size")
    private long size;

    @Column(name = "image_data")
    private byte[] imageData;

    public ProductImage(String name, String type, long size, byte[] imageData) {
        this.name = name;
        this.type = type;
        this.size = size;
        this.imageData = imageData;
    }

}
