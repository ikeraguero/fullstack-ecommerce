package com.shoppingsystem.shopping_system.product.service;

import com.shoppingsystem.shopping_system.category.exceptions.CategoryNotFoundException;
import com.shoppingsystem.shopping_system.category.model.Category;
import com.shoppingsystem.shopping_system.category.repository.CategoryRepository;
import com.shoppingsystem.shopping_system.category.service.CategoryService;
import com.shoppingsystem.shopping_system.order.service.OrderItemService;
import com.shoppingsystem.shopping_system.pagination.dto.PaginationResponse;
import com.shoppingsystem.shopping_system.product.dto.ProductRequest;
import com.shoppingsystem.shopping_system.product.dto.ProductResponse;
import com.shoppingsystem.shopping_system.product.exception.ProductNotFoundException;
import com.shoppingsystem.shopping_system.product.model.Product;
import com.shoppingsystem.shopping_system.product.model.ProductImage;
import com.shoppingsystem.shopping_system.product.repository.ProductRepository;
import com.shoppingsystem.shopping_system.product_review.dto.ProductReviewResponse;
import com.shoppingsystem.shopping_system.product_review.model.ProductReview;
import com.shoppingsystem.shopping_system.product_review.service.ProductReviewService;
import com.shoppingsystem.shopping_system.user.service.UserService;
import com.shoppingsystem.shopping_system.wishlist.dto.WishlistItemResponse;
import com.shoppingsystem.shopping_system.wishlist.service.WishlistItemService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

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
    private WishlistItemService wishlistItemService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserService userService;

    public ProductServiceImpl() {
    }


    public PaginationResponse getPaginatedProducts(int page, int size) {
        Page<ProductResponse> currentPage = findAll(page, size);
        List<ProductResponse> currentPageContent = currentPage.getContent();
        List<ProductResponse> nextPageContent = Collections.emptyList();
        List<ProductResponse> previousPageContent = Collections.emptyList();

        if (page < currentPage.getTotalPages() - 1) {
            Page<ProductResponse> nextPage = findAll(page + 1, size);
            nextPageContent = nextPage.getContent();
        }

        if (page > 0) {
            Page<ProductResponse> previousPage = findAll(page - 1, size);
            previousPageContent = previousPage.getContent();
        }

        return new PaginationResponse(
                currentPageContent,
                nextPageContent,
                previousPageContent,
                page,
                currentPage.getTotalPages(),
                currentPage.hasNext(),
                currentPage.hasPrevious()
        );
    }

    public Page<ProductResponse> findAll(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return productRepository.findAll(pageRequest)
                .map(this::convertToDTO);
    }

    @Override
    public ProductResponse findById(Long productId, Long userId) {
        if (productId == null || userId == null) {
            throw new IllegalArgumentException("Product ID and User ID must not be null");
        }

        Optional<Product> result = productRepository.findById(productId);
        Product theProduct = result.orElseThrow(() ->
                new ProductNotFoundException("Did not find product with productId - " + productId));

        boolean canUserReview = canReview(productId, userId);
        boolean isInUsersWishlist = wishlistItemService.isProductInWishlist(userId, productId);

        WishlistItemResponse wishlistItem = wishlistItemService.getWishlistItemsByUserId(userId).stream()
                .filter(wishlistItemResponse -> Objects.equals(wishlistItemResponse
                        .getProductId(), productId))
                .findFirst()
                .orElse(null);

        ProductResponse productResponse = convertToDTO(theProduct);
        productResponse.setCanUserReview(canUserReview);
        productResponse.setInUserWishlist(isInUsersWishlist);
        productResponse.setRelatedProducts(getRandomProductsByCategory(productResponse.getCategoryId()));
        if (wishlistItem != null) {
            productResponse.setWishlistItemId(wishlistItem.getId());
        }
        return productResponse;
    }

    private boolean canReview(Long productId, Long userId) {
        return !productReviewService.existsByProductIdAndUserId(productId, userId)
                && orderItemService.hasUserBoughtProduct(productId, userId);
    }

    @Override
    public List<ProductResponse> findProductsByCategory(String categoryName) {
        List<Product> products = productRepository.findProductsByCategory(categoryName);
        if (products.isEmpty()) {
            return new LinkedList<>();
        }
        Map<Long, ProductImage> productImageMap = generateProductImageMap(products);
        Map<Long, List<ProductReviewResponse>> reviewMap = generateProductReviewsMap(products);

        return generateProductResponseList(productImageMap, reviewMap, products);
    }

    @Override
    @Transactional
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void saveAll(List<Product> productList) {
        productRepository.saveAll(productList);
    }


    @Override
    public Map<String, List<ProductResponse>> getRandomCategoryProducts() {
        //todo
        //get all categories and limit to 6
        List<Category> categories = categoryRepository.findAll();
        Collections.shuffle(categories);
        List<Category> limitedCategories = categories.stream()
                .limit(6)
                .collect(Collectors.toList());

        //create map with categories (ids) that have 5 or more products
        Map<Integer, List<Product>> categoryProductsMap = limitedCategories.stream()
                .filter(category -> productRepository.countByCategoryId(category.getId()) >= 5)
                .collect(Collectors.toMap(
                        Category::getId,
                        category -> productRepository.findRandom5ByCategoryId(category.getId())
                ));

        //productimageids for batch query
        Set<Long> productImageIds = categoryProductsMap.values().stream()
                .flatMap(List::stream)
                .map(Product::getImageId)
                .collect(Collectors.toSet());

        //batch query
        Map<Long, ProductImage> productImagesMap = productImageService.findProductImagesByIds(productImageIds);

        return categoryProductsMap.entrySet().stream()
                .collect(Collectors.toMap(
                        entry -> getCategoryNameById(entry.getKey(), limitedCategories),
                        entry -> entry.getValue().stream()
                                .map(product -> mapToProductResponse(product, productImagesMap))
                                .collect(Collectors.toList())
                ));
    }

    private String getCategoryNameById(int categoryId, List<Category> categories) {
        return categories.stream()
                .filter(category -> category.getId() == categoryId)
                .map(Category::getName)
                .findFirst()
                .orElse("Unknown");
    }

    private ProductResponse mapToProductResponse(Product product, Map<Long, ProductImage> productImagesMap) {
        ProductImage productImage = productImagesMap.get(product.getImageId());
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getStockQuantity(),
                product.getCategory().getId(),
                product.getCategory().getName(),
                product.getProductDescription(),
                productImage.getType(),
                productImage.getImageData(),
                product.getImageId(),
                null,
                false,
                null
        );
    }

    public List<ProductResponse> getRandomProductsByCategory(int categoryId) {
        List<Product> products = productRepository.findByCategoryId(categoryId);
        Collections.shuffle(products);
        int limit = 5;
        List<Product> randomProducts = products.stream().limit(limit).collect(Collectors.toList());
        return randomProducts.stream().map(this::convertToProductResponse).collect(Collectors.toList());
    }

    private ProductResponse convertToProductResponse(Product product) {
        ProductImage productImage = productImageService.findByIdEntity(product.getImageId());
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getStockQuantity(),
                product.getCategory().getId(),
                product.getCategory().getName(),
                product.getProductDescription(),
                productImage.getType(),
                productImage.getImageData(),
                product.getImageId(),
                null ,
                false,
                null
        );
    }


    @Override
    public List<ProductResponse> searchProducts(String query, int page, int size) {
        if (query == null || query.trim().isEmpty()) {
            return Collections.emptyList();
        }
        System.out.println(query);
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.searchProducts(query, pageable);
        if (productPage.isEmpty()) {
            return Collections.emptyList();
        }
        Map<Long, ProductImage> productImageMap = generateProductImageMap(productPage.getContent());
        Map<Long, List<ProductReviewResponse>> reviewMap = generateProductReviewsMap(productPage.getContent());

        return generateProductResponseList(productImageMap, reviewMap, productPage.getContent());
    }


    private Map<Long, List<ProductReviewResponse>> generateProductReviewsMap(List<Product> products) {
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
                    ProductImage productImage = productImageMap.get(product.getImageId());
                    List<ProductReviewResponse> productReviewResponseList = reviewMap.get(product.getId());
                    return new ProductResponse(
                            product.getId(),
                            product.getName(),
                            product.getPrice(),
                            product.getStockQuantity(),
                            product.getCategory().getId(),
                            product.getCategory().getName(),
                            product.getProductDescription(),
                            productImage.getType(),
                            productImage.getImageData(),
                            productImage.getId(),
                            productReviewResponseList
                    );
                })
                .toList();
    }

    private Map<Long, ProductImage> generateProductImageMap(List<Product> products) {
        List<Long> productImageIds = products.stream()
                .map(Product::getImageId)
                .toList();

        List<ProductImage> productImageList = productImageService.findByIds(productImageIds);
        return productImageList.stream()
                .collect(Collectors.toMap(ProductImage::getId, productImage -> productImage));
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        if (id == null) {
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

        Category category = categoryService.findByIdEntity(productRequest.getCategoryId());
        if (category == null) {
            throw new CategoryNotFoundException("Category not found");
        }

        validateImage(image);

        byte[] imageBytes = image.getBytes();
        String base64Image = Base64.getEncoder().encodeToString(imageBytes);

        ProductImage productImage = new ProductImage(
                image.getOriginalFilename(), image.getContentType(),
                image.getSize(), base64Image
        );

        productImageService.save(productImage);

        Product existingProduct = findByIdEntity(productRequest.getId());

        existingProduct.setName(productRequest.getName());
        existingProduct.setPrice(productRequest.getPrice());
        existingProduct.setStockQuantity(productRequest.getStockQuantity());
        existingProduct.setProductDescription(productRequest.getProductDescription());
        existingProduct.setCategory(category);
        existingProduct.setImageId(productImage.getId());
    }

    @Transactional
    @Override
    public Product addProduct(MultipartFile image, ProductRequest productRequest) throws IOException, IOException {
        Category category = categoryService.findByIdEntity(productRequest.getCategoryId());
        if (category == null) {
            throw new CategoryNotFoundException("Category not found");
        }

        validateImage(image);

        byte[] imageBytes = image.getBytes();
        String base64Image = Base64.getEncoder().encodeToString(imageBytes);

        ProductImage productImage = new ProductImage(
                image.getOriginalFilename(), image.getContentType(),
                image.getSize(), base64Image
        );

        productImageService.save(productImage);

        Product product = new Product();
        product.setName(productRequest.getName());
        product.setImageId(productImage.getId());
        product.setPrice(productRequest.getPrice());
        product.setStockQuantity(productRequest.getStockQuantity());
        product.setProductDescription(productRequest.getProductDescription());
        product.setCategory(category);

        // save the product
        return productRepository.save(product);
    }

    private void validateImage(MultipartFile image) {
        if (image.isEmpty()) {
            throw new IllegalArgumentException("Image cannot be empty");
        }
        if (image.getSize() > 5 * 1024 * 1024) {
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
        Category category = categoryService.findByIdEntity(product.getCategory().getId());

        if (product.getImageId() == null) {
            throw new RuntimeException("Product image ID cannot be null");
        }

        ProductImage productImage = productImageService.findByIdEntity(product.getImageId());

        List<ProductReviewResponse> productReviewResponseList = productReviewService
                .findAllReviewsByProduct(product.getId());

        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getStockQuantity(),
                category.getId(),
                category.getName(),
                product.getProductDescription(),
                productImageService.findById(product.getImageId()).getType(),
                productImageService.findById(product.getImageId()).getImage_data(),
                productImageService.findById(product.getImageId()).getId(),
                productReviewResponseList
        );
    }
}
