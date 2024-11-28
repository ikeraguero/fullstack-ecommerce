package com.shoppingsystem.shopping_system.service;

import com.shoppingsystem.shopping_system.model.Product;

import java.util.List;

public interface ProductService {

    List<Product> findAll();
    Product findById(int id);
    Product save(Product product);
    void deleteById(int id);
}
