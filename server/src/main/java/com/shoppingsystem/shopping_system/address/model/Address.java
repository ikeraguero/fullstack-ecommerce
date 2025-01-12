package com.shoppingsystem.shopping_system.address.model;

import com.shoppingsystem.shopping_system.user.model.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(schema = "ecommerce_db", name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "country")
    private String country;

    @Column(name = "city")
    private String city;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Address(String address, String postalCode, String country, String city, User user) {
        this.address = address;
        this.postalCode = postalCode;
        this.country = country;
        this.city = city;
        this.user = user;
    }
}
