package com.shoppingsystem.shopping_system.service;

import com.shoppingsystem.shopping_system.dto.ProductDTO;
import com.shoppingsystem.shopping_system.model.Category;
import com.shoppingsystem.shopping_system.model.Product;
import com.shoppingsystem.shopping_system.model.ProductImage;
import com.shoppingsystem.shopping_system.repository.CategoryRepository;
import com.shoppingsystem.shopping_system.repository.ProductImageRepository;
import com.shoppingsystem.shopping_system.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    public ProductServiceImpl() {
    }

    @Override
    public List<ProductDTO> findAll() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public ProductDTO findById(Long id) {
        Optional<Product> result = productRepository.findById(id);
        Product theProduct = null;
        if(result.isPresent()) {
            theProduct = result.get();
        } else {
            throw new RuntimeException("Did not find product with id - " + id);
        }
        return convertToDTO(theProduct);
    }

    @Override
    @Transactional
    public Product save(Product product) {
        return (Product) productRepository.save(product);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

    public Optional<Product> findByIdEntity(Long id) {
        return productRepository.findById(id);
    }


    public ProductDTO convertToDTO(Product product) {
        System.out.println(product);
        Category category = categoryRepository.findById(product.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        ProductImage productImage = productImageRepository.findById(product.getImage_id())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getStock_quantity(),
                category.getId(),
                category.getName(),
                product.getProduct_description(),
                product.getImage_id(),
                productImage.getImageData(),
                productImage.getType()
        );
    }
}
