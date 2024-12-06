package com.shoppingsystem.shopping_system.service;

import com.shoppingsystem.shopping_system.dto.CategoryDTO;
import com.shoppingsystem.shopping_system.model.Category;
import com.shoppingsystem.shopping_system.model.Product;
import com.shoppingsystem.shopping_system.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<CategoryDTO> findAll() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public Category findById(int id) {
        Optional<Category> result = categoryRepository.findById(id);
        Category theCategory = null;
        if(result.isPresent()) {
            theCategory = result.get();
        } else {
            throw new RuntimeException("Did not find product with id - " + id);
        }
        return theCategory;
    }

    @Override
    @Transactional
    public Category save(Category category) {
        return (Category) categoryRepository.save(category);
    }

    @Override
    @Transactional
    public void deleteById(int id) {
        categoryRepository.deleteById(id);
    }

    public CategoryDTO convertToDTO(Category category) {
        return new CategoryDTO(category.getId(), category.getName());
    }
}
