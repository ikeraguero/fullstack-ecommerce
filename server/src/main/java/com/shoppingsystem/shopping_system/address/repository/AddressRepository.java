package com.shoppingsystem.shopping_system.address.repository;

import com.shoppingsystem.shopping_system.address.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {

    @Query("SELECT a FROM Address a WHERE a.user.id = :userId")
    Address findAddressByUserId(@Param("userId") Long userId);

    Optional<Address> findById(Long userId);
}
