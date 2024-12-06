package com.shoppingsystem.shopping_system.service;

import com.shoppingsystem.shopping_system.dto.CategoryDTO;
import com.shoppingsystem.shopping_system.model.Category;

import java.util.List;

public interface CategoryService {
    List<CategoryDTO> findAll();
    Category findById(int id);
    Category save(Category category);
    void deleteById(int id);

}