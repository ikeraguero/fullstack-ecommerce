package com.shoppingsystem.shopping_system.product.repository;

import com.shoppingsystem.shopping_system.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p JOIN Category c ON p.category.id = c.id WHERE c.name=:categoryName")
    List<Product> findProductsByCategory(@Param("categoryName") String categoryName);
    
    @Query("SELECT p FROM Product p WHERE p.name LIKE %:query%")
    List<Product> searchProducts(@Param("query") String query);

    @Query("SELECT p FROM Product p WHERE p.id IN :ids")
    List<Product> findByIds(@Param("ids") List<Long> ids);
}
