package com.shoppingsystem.shopping_system.product.service;

import com.shoppingsystem.shopping_system.category.exceptions.CategoryNotFoundException;
import com.shoppingsystem.shopping_system.category.model.Category;
import com.shoppingsystem.shopping_system.category.service.CategoryService;
import com.shoppingsystem.shopping_system.order.service.OrderItemService;
import com.shoppingsystem.shopping_system.product.dto.ProductRequest;
import com.shoppingsystem.shopping_system.product.dto.ProductResponse;
import com.shoppingsystem.shopping_system.product.exception.NoProductsFoundException;
import com.shoppingsystem.shopping_system.product.exception.ProductNotFoundException;
import com.shoppingsystem.shopping_system.product.model.Product;
import com.shoppingsystem.shopping_system.product.model.ProductImage;
import com.shoppingsystem.shopping_system.product.repository.ProductRepository;
import com.shoppingsystem.shopping_system.product_review.dto.ProductReviewResponse;
import com.shoppingsystem.shopping_system.product_review.model.ProductReview;
import com.shoppingsystem.shopping_system.product_review.service.ProductReviewService;
import com.shoppingsystem.shopping_system.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductImageService productImageService;

    @Autowired
    private ProductReviewService productReviewService;

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private UserService userService;

    public ProductServiceImpl() {
    }

    @Override
    public List<ProductResponse> findAll() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public ProductResponse findById(Long productId, Long userId) {
        if(productId == null || userId == null) {
            throw new IllegalArgumentException("Product ID and User ID must not be null");
        }

        Optional<Product> result = productRepository.findById(productId);
        Product theProduct = result.orElseThrow(() ->
                new ProductNotFoundException("Did not find product with productId - " + productId));
        boolean canUserReview = orderItemService.hasUserBoughtProduct(productId, userId);
        ProductResponse productResponse = convertToDTO(theProduct);
        productResponse.setCanUserReview(canUserReview);
        return productResponse;
    }

    @Override
    public List<ProductResponse> findProductsByCategory(String categoryName) {
        List<Product> products =  productRepository.findProductsByCategory(categoryName);
        if(products == null) {
            throw new NoProductsFoundException("No products where found for category " + categoryName);
        }

        Map<Long, ProductImage> productImageMap = generateProductImageMap(products);
        Map<Long, List<ProductReviewResponse>> reviewMap = generateProductReviewsMap(products);

        return generateProductResponseList(productImageMap, reviewMap, products);
    }

    @Override
    @Transactional
    public Product save(Product product) {
        return (Product) productRepository.save(product);
    }

    @Override
    public void saveAll(List<Product> productList) {
        productRepository.saveAll(productList);
    }

    @Override
    public List<ProductResponse> searchProducts(String query) {
        List<Product> products = productRepository.searchProducts(query);
        if(products.isEmpty()) {
            throw new NoProductsFoundException("No products where found for query - " + query);
        }

        //batch
        Map<Long, ProductImage> productImageMap = generateProductImageMap(products);
        Map<Long, List<ProductReviewResponse>> reviewMap = generateProductReviewsMap(products);

       return generateProductResponseList(productImageMap, reviewMap, products);
    }

    private Map<Long, List<ProductReviewResponse>> generateProductReviewsMap(List<Product> products ) {
        List<Long> productIds = products.stream()
                .map(Product::getId)
                .toList();

        List<ProductReview> productReviews = productReviewService.findReviewByProductsId(productIds);

        List<ProductReviewResponse> productReviewResponseList = productReviews.stream()
                .map(review -> new ProductReviewResponse(
                        review.getProduct().getId(),
                        review.getRating(),
                        review.getComment(),
                        review.getUser().getFirstName(),
                        review.getUser().getLastName(),
                        review.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime()
                )).toList();

        return productReviewResponseList.stream()
                .collect(Collectors.groupingBy(ProductReviewResponse::getProductId));
    }

    private List<ProductResponse> generateProductResponseList(
            Map<Long, ProductImage> productImageMap,
            Map<Long, List<ProductReviewResponse>> reviewMap,
            List<Product> products) {
        return products.stream()
                .map(product -> {
                    ProductImage productImage = productImageMap.get(product.getImage_id());
                    List<ProductReviewResponse> productReviewResponseList = reviewMap.get(product.getId());
                    return new ProductResponse(
                            product.getId(), product.getName(), product.getPrice(), product.getStock_quantity(),
                            product.getCategory().getId(), product.getCategory().getName(), product.getProduct_description(),
                            productImage.getType(), productImage.getImageData(), productImage.getId(), productReviewResponseList
                    );
                })
                .toList();
    }

    private Map<Long, ProductImage> generateProductImageMap(List<Product> products) {
        List<Long> productImageIds = products.stream()
                .map(Product::getImage_id)
                .toList();

        List<ProductImage> productImageList = productImageService.findByIds(productImageIds);
        return productImageList.stream()
                .collect(Collectors.toMap(ProductImage::getId, productImage -> productImage));
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        if(id==null) {
            throw new IllegalArgumentException("Product ID must not be null");
        }
        productRepository.deleteById(id);
    }

    public Product findByIdEntity(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Transactional
    @Override
    public void updateProduct(MultipartFile image, ProductRequest productRequest) throws IOException {
        if (productRequest.getId() == null) {
            throw new IllegalArgumentException("Product ID must not be null");
        }

        Category category = categoryService.findByIdEntity(productRequest.getCategory_id());
        if(category == null) {
            throw new CategoryNotFoundException("Category not found");
        }

        validateImage(image);

        ProductImage productImage = new ProductImage(
                image.getOriginalFilename(), image.getContentType(),
                image.getSize(), image.getBytes()
        );

        productImageService.save(productImage);

        Product existingProduct = findByIdEntity(productRequest.getId());


        // Update the product fields
        existingProduct.setName(productRequest.getName());
        existingProduct.setPrice(productRequest.getPrice());
        existingProduct.setStock_quantity(productRequest.getStock_quantity());
        existingProduct.setProduct_description(productRequest.getProduct_description());
        existingProduct.setCategory(category);
        existingProduct.setImage_id(productImage.getId());

    }

    @Transactional
    @Override
    public Product addProduct(MultipartFile image, ProductRequest productRequest) throws IOException {
        Category category = categoryService.findByIdEntity(productRequest.getCategory_id());
        if(category == null) {
            throw new CategoryNotFoundException("Category not found");
        }

        validateImage(image);

        ProductImage productImage = new ProductImage(
                image.getOriginalFilename(), image.getContentType(),
                image.getSize(), image.getBytes()
        );

        productImageService.save(productImage);

        Product product = new Product();
        product.setName(productRequest.getName());
        product.setImage_id(productImage.getId());
        product.setPrice(productRequest.getPrice());
        product.setStock_quantity(productRequest.getStock_quantity());
        product.setProduct_description(productRequest.getProduct_description());
        product.setCategory(category);

        // save the product
        return productRepository.save(product);
    }

    private void validateImage(MultipartFile image) {
        if (image.isEmpty()) {
            throw new IllegalArgumentException("Image cannot be empty");
        }
        if (image.getSize() > 5 * 1024 * 1024) {  // 5 MB limit
            throw new IllegalArgumentException("Image size exceeds 5MB limit");
        }
        if (!List.of("image/png", "image/jpeg", "image/jpg").contains(image.getContentType())) {
            throw new IllegalArgumentException("Only PNG, JPEG, and JPG images are allowed");
        }
    }

    @Override
    public List<Product> findByIds(List<Long> productsIds) {
        return productRepository.findByIds(productsIds);
    }


    public ProductResponse convertToDTO(Product product) {
        System.out.println(product);
        Category category = categoryService.findByIdEntity(product.getCategory().getId());

        if (product.getImage_id() == null) {
            throw new RuntimeException("Product image ID cannot be null");
        }

        ProductImage productImage = productImageService.findByIdEntity(product.getImage_id());

        List<ProductReviewResponse> productReviewResponseList = productReviewService.findAllReviewsByProduct(product.getId());

        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getStock_quantity(),
                category.getId(),
                category.getName(),
                product.getProduct_description(),
                productImageService.findById(product.getImage_id()).getType(),
                productImageService.findById(product.getImage_id()).getImage_data(),
                productImageService.findById(product.getImage_id()).getId(),
                productReviewResponseList
        );
    }
}
