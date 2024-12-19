package com.shoppingsystem.shopping_system.order.model;

import com.shoppingsystem.shopping_system.user.model.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
@Entity
@Table(name = "order", schema = "ecommerce_project")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long order_id;

    @Column(name = "user_id")
    private User user;

    @Column(name = "total_price")
    private double totalPrice;

    @Column(name= "order_date")
    private Date date;

    @Column(name = "discount")
    private double discount;

    @Column(name = "shipping address")
    private double shippingAddress;
}
