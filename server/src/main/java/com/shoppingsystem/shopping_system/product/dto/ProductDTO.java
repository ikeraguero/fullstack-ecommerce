package com.shoppingsystem.shopping_system.product.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ProductDTO {

    public ProductDTO(Long id, String name, double price, int stock_quantity, int category_id, String category_name,
                      String product_description, byte[] image_data) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock_quantity = stock_quantity;
        this.category_id = category_id;
        this.category_name = category_name;
        this.product_description = product_description;
        this.image_data = image_data;
    }

    private Long id;
    private String name;
    private double price;
    private int stock_quantity;
    private int category_id;
    private String category_name;
    private String product_description;
    private byte[] image_data;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStock_quantity() {
        return stock_quantity;
    }

    public void setStock_quantity(int stock_quantity) {
        this.stock_quantity = stock_quantity;
    }

    public String getCategory_name() {
        return category_name;
    }

    public void setCategory_name(String category_name) {
        this.category_name = category_name;
    }

    public String getProduct_description() {
        return product_description;
    }

    public void setProduct_description(String product_description) {
        this.product_description = product_description;
    }

    public byte[] getImage_data() {
        return image_data;
    }

    public void setImage_data(byte[] image_data) {
        this.image_data = image_data;
    }


    public int getCategory_id() {
        return category_id;
    }

    public void setCategory_id(int category_id) {
        this.category_id = category_id;
    }

}
