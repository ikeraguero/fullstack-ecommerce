package com.shoppingsystem.shopping_system.model;

import jakarta.persistence.*;

@Entity
@Table(name="cart", schema = "ecommerce_project")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long id;

    @Column(name="status")
    private String status;

    @Column(name="user_id")
    private Long userId;

    public Cart() {
    }

    public Cart(Long id, String status, Long userId) {
        this.id = id;
        this.status = status;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
