package com.shoppingsystem.shopping_system.cart.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;

@Getter
@Setter
public class CartItemDTO {

    public CartItemDTO(Long id, Long cart_id, Long product_id, String product_name, String category_name,
                       int quantity, double price, byte[] image_data, String image_type) {
        this.id = id;
        this.cart_id = cart_id;
        this.product_id = product_id;
        this.product_name = product_name;
        this.category_name = category_name;
        this.quantity = quantity;
        this.price = price;
        this.image_data = image_data;
        this.image_type = image_type;
    }

    private Long id;
    private Long cart_id;
    private Long product_id;
    private String product_name;
    private String category_name;
    private int quantity;
    private double price;
    private byte[] image_data;
    private String image_type;

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public byte[] getImage_data() {
        return image_data;
    }

    public void setImage_data(byte[] image_data) {
        this.image_data = image_data;
    }

    public String getImage_type() {
        return image_type;
    }

    public void setImage_type(String image_type) {
        this.image_type = image_type;
    }

    public Long getCart_id() {
        return cart_id;
    }

    public void setCart_id(Long cart_id) {
        this.cart_id = cart_id;
    }

    public Long getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Long product_id) {
        this.product_id = product_id;
    }

    public String getCategory_name() {
        return category_name;
    }

    public void setCategory_name(String category_name) {
        this.category_name = category_name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "CartItemDTO{" +
                ", cart_id=" + cart_id +
                ", product_id=" + product_id +
                ", product_name='" + product_name + '\'' +
                ", quantity=" + quantity +
                ", price=" + price +
                ", image_data=" + Arrays.toString(image_data) +
                ", image_type='" + image_type + '\'' +
                '}';
    }
}
