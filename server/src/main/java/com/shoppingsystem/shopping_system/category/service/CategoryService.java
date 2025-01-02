package com.shoppingsystem.shopping_system.category.service;

import com.shoppingsystem.shopping_system.category.dto.CategoryResponse;
import com.shoppingsystem.shopping_system.category.model.Category;

import java.util.List;

public interface CategoryService {
    List<CategoryResponse> findAll();
    CategoryResponse findById(int id);
    Category findByIdEntity(int id);
    Category save(Category category);
    void deleteById(int id);

}