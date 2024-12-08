package com.shoppingsystem.shopping_system.repository;

import com.shoppingsystem.shopping_system.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
