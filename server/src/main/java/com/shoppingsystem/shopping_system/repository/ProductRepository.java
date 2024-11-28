package com.shoppingsystem.shopping_system.repository;

import com.shoppingsystem.shopping_system.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
