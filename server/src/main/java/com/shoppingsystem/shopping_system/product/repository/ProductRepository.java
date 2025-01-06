package com.shoppingsystem.shopping_system.product.repository;

import com.shoppingsystem.shopping_system.product.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query(value = "SELECT p.category_id FROM ecommerce_project.product p GROUP BY p.category_id HAVING COUNT(p.id) " +
            ">= 6", nativeQuery = true)
    List<Integer> findCategoryIdsWithAtLeast6Products();

    @Query(value = "SELECT * FROM ecommerce_project.product p WHERE p.category_id = :categoryId ORDER BY RANDOM() " +
            "LIMIT 5", nativeQuery = true)
    List<Product> findRandom5ByCategoryId(@Param("categoryId") int categoryId);

    @Query("SELECT COUNT(p) FROM Product p WHERE p.category.id = :categoryId")
    long countByCategoryId(@Param("categoryId") int categoryId);

    @Query("SELECT p FROM Product p WHERE p.name LIKE %:query% OR p.productDescription LIKE %:query%")
    Page<Product> searchProducts(@Param("query") String query, Pageable pageable);

    List<Product> findByCategoryId(int categoryId);
}
