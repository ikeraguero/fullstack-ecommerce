package com.shoppingsystem.shopping_system.address.service;

import com.shoppingsystem.shopping_system.address.model.Address;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;


public interface AddressService {
    Address findAddressByUserId(Long userId);
}
