package com.shoppingsystem.shopping_system.product_review.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shoppingsystem.shopping_system.product.model.Product;
import com.shoppingsystem.shopping_system.user.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product_review", schema = "ecommerce_project")
public class ProductReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", referencedColumnName = "product_id")
    @JsonIgnore
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", referencedColumnName = "id")
    @JsonIgnore
    private User user;

    @Column(name = "review_rating")
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
