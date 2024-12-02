package com.shoppingsystem.shopping_system.repository;

import com.shoppingsystem.shopping_system.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
