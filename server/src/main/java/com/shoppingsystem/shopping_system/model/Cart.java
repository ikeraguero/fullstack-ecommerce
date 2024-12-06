package com.shoppingsystem.shopping_system.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="cart", schema = "ecommerce_project")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private int id;

    @Column(name="status")
    private String status;

    @Column(name="created_at")
    private Date createdAt;
}
