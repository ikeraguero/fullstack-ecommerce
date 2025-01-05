package com.shoppingsystem.shopping_system.product.repository;

import com.shoppingsystem.shopping_system.product.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    @Query("SELECT pi FROM ProductImage pi WHERE pi.id IN :ids")
    List<ProductImage> findByIds(@Param("ids") List<Long> ids);

    @Query("SELECT pi FROM ProductImage pi WHERE pi.id IN :imageIds")
    List<ProductImage> findByIdsSet(@Param("imageIds") Set<Long> imageIds);

}
