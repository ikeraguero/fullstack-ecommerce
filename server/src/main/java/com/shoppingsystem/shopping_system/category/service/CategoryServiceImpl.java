package com.shoppingsystem.shopping_system.category.service;

import com.shoppingsystem.shopping_system.category.dto.CategoryResponse;
import com.shoppingsystem.shopping_system.category.exceptions.CategoryNotFoundException;
import com.shoppingsystem.shopping_system.category.model.Category;
import com.shoppingsystem.shopping_system.category.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<CategoryResponse> findAll() {
        List<Category> categories = categoryRepository.findAll();
        if(categories.isEmpty()) {
            throw new CategoryNotFoundException("No categories were found");
        }
        return categories.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public CategoryResponse findById(int id) {
        return categoryRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with id - " + id ));
    }

    @Override
    public Category findByIdEntity(int id) {
        return categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException("Couldn't found category" +
                "with ID - " + id));
    }

    @Override
    @Transactional
    public Category save(Category category) {
        if(category == null || category.getName() == null || category.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Category must not be null");
        }
        return categoryRepository.save(category);
    }

    @Override
    @Transactional
    public void deleteById(int id) {
        if (!categoryRepository.existsById(id)) {
            throw new CategoryNotFoundException("Category not found with id - " + id);
        }
        categoryRepository.deleteById(id);
    }

    public CategoryResponse convertToDTO(Category category) {
        return new CategoryResponse(category.getId(), category.getName());
    }
}
