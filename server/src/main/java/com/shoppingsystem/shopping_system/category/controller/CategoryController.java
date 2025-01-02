package com.shoppingsystem.shopping_system.category.controller;


import com.shoppingsystem.shopping_system.category.dto.CategoryResponse;
import com.shoppingsystem.shopping_system.category.exceptions.CategoryNotFoundException;
import com.shoppingsystem.shopping_system.category.model.Category;
import com.shoppingsystem.shopping_system.category.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("/api")
@RestController
public class CategoryController {

    @Autowired
    CategoryService categoryService;


    @GetMapping("/categories")
    ResponseEntity<?> getCategories() {
        try {
            List<CategoryResponse> categoryResponseList = categoryService.findAll();
            return ResponseEntity.ok(categoryResponseList);
        } catch(CategoryNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e ) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }

    }

    @GetMapping("/categories/{categoryId}")
    ResponseEntity<?> getCategory(@PathVariable int categoryId) {
        try {
            CategoryResponse categoryResponse = categoryService.findById(categoryId);
            return ResponseEntity.ok(categoryResponse);
        } catch (CategoryNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e ) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }

    }

    @PostMapping("/categories")
    ResponseEntity<?> createCategory(@RequestBody Category category) {
        try {
            Category savedCategory = categoryService.save(category);
            return ResponseEntity.status(201).body(savedCategory);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e ) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

}
