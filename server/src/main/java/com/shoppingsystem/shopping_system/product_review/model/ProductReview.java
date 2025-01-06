package com.shoppingsystem.shopping_system.product_review.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shoppingsystem.shopping_system.product.model.Product;
import com.shoppingsystem.shopping_system.user.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product_review", schema = "ecommerce_db")
public class ProductReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    @JsonIgnore
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", referencedColumnName = "id")
    @JsonIgnore
    private User user;

    @Column(name = "rating")
    private int rating;

    @Column(name = "review_comment")
    private String comment;

    @Column(name = "review_date")
    private Date date;

    public ProductReview(Product product, User user, int rating, String comment, Date date) {
        this.product = product;
        this.user = user;
        this.rating = rating;
        this.comment = comment;
        this.date = date;
    }
}
