package com.shoppingsystem.shopping_system.order.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shoppingsystem.shopping_system.user.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order", schema = "ecommerce_db")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long orderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private User user;

    @Getter
    @Column(name = "total_price")
    private double totalPrice;

    @Column(name= "order_date")
    private Date date;

    @Column(name = "discount")
    private double discount;

    @Column(name = "shipping_address")
    private String shippingAddress;

    @Column(name = "status")
    private String status;

    public Order(User user, double totalPrice, Date date, double discount, String shippingAddress) {
        this.user = user;
        this.totalPrice = totalPrice;
        this.date = date;
        this.discount = discount;
        this.shippingAddress = shippingAddress;
        this.status = "pending";
    }
}
