package com.shoppingsystem.shopping_system.service;

import com.shoppingsystem.shopping_system.model.Product;
import com.shoppingsystem.shopping_system.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService{

    ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductServiceImpl() {
    }

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Product findById(int id) {
        Optional<Product> result = productRepository.findById(id);
        Product theProduct = null;
        if(result.isPresent()) {
            theProduct = result.get();
        } else {
            throw new RuntimeException("Did not find product with id - " + id);
        }
        return theProduct;
    }

    @Override
    @Transactional
    public Product save(Product product) {
        return (Product) productRepository.save(product);
    }

    @Override
    @Transactional
    public void deleteById(int id) {
        productRepository.deleteById(id);
    }
}
