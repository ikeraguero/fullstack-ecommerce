package com.shoppingsystem.shopping_system.controller;


import com.shoppingsystem.shopping_system.model.Category;
import com.shoppingsystem.shopping_system.service.CategoryService;
import com.shoppingsystem.shopping_system.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api")
@RestController
public class CategoryController {

    CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    public CategoryController() {
    }

    @GetMapping("/categories")
    List<Category> getCategories() {
        return categoryService.findAll();
    }

    @GetMapping("/categories/{categoryId}")
    Category getCategory(@PathVariable int categoryId) {
        return categoryService.findById(categoryId);
    }

}
