package com.shoppingsystem.shopping_system.product.service;

import com.shoppingsystem.shopping_system.category.model.Category;
import com.shoppingsystem.shopping_system.category.repository.CategoryRepository;
import com.shoppingsystem.shopping_system.product.dto.ProductResponse;
import com.shoppingsystem.shopping_system.product.model.Product;
import com.shoppingsystem.shopping_system.product.model.ProductImage;
import com.shoppingsystem.shopping_system.product.repository.ProductImageRepository;
import com.shoppingsystem.shopping_system.product.repository.ProductRepository;
import com.shoppingsystem.shopping_system.product_review.dto.ProductReviewResponse;
import com.shoppingsystem.shopping_system.product_review.service.ProductReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
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

    @Autowired
    private ProductReviewService productReviewService;

    public ProductServiceImpl() {
    }

    @Override
    public List<ProductResponse> findAll() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public ProductResponse findById(Long id) {
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
    public List<ProductResponse> findProductsByCategory(String categoryName) {
        List<Product> products=  productRepository.findProductsByCategory(categoryName);
        List<ProductResponse> productResponseList = new LinkedList<>();

        for(Product product : products) {
            ProductImage productImage = productImageRepository.findById(product.getImage_id()).get();
            List<ProductReviewResponse> productReviewResponseList = productReviewService.findAllReviewsByProduct(product.getId());
            ProductResponse productResponse = new ProductResponse(
                    product.getId(), product.getName(), product.getPrice(), product.getStock_quantity(),
                    product.getCategory().getId(), product.getCategory().getName(), product.getProduct_description(),
                    productImage.getType(), productImage.getImageData(), productImage.getId(), productReviewResponseList
            );
            productResponseList.add(productResponse);
        }

        return productResponseList;
    }

    @Override
    @Transactional
    public Product save(Product product) {
        return (Product) productRepository.save(product);
    }

    @Override
    public List<ProductResponse> searchProducts(String query) {
        List<Product> products = productRepository.searchProducts(query);
        List<ProductResponse> productResponseList = new LinkedList<>();

        for(Product product : products) {
            ProductImage productImage = productImageRepository.findById(product.getImage_id()).get();
            List<ProductReviewResponse> productReviewResponseList = productReviewService.findAllReviewsByProduct(product.getId());
            ProductResponse productResponse = new ProductResponse(
                    product.getId(), product.getName(), product.getPrice(), product.getStock_quantity(),
                    product.getCategory().getId(), product.getCategory().getName(), product.getProduct_description(),
                    productImage.getType(), productImage.getImageData(), productImage.getId(), productReviewResponseList
            );
            productResponseList.add(productResponse);
        }

        return productResponseList;
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

    public Product findByIdEntity(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }


    public ProductResponse convertToDTO(Product product) {
        System.out.println(product);
        Category category = categoryRepository.findById(product.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (product.getImage_id() == null) {
            throw new RuntimeException("Product image ID cannot be null");
        }

        ProductImage productImage = productImageRepository.findById(product.getImage_id())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        List<ProductReviewResponse> productReviewResponseList = productReviewService.findAllReviewsByProduct(product.getId());

        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getStock_quantity(),
                category.getId(),
                category.getName(),
                product.getProduct_description(),
                productImageRepository.findById(product.getImage_id()).get().getType(),
                productImageRepository.findById(product.getImage_id()).get().getImageData(),
                productImageRepository.findById(product.getImage_id()).get().getId(),
                productReviewResponseList
        );
    }
}
