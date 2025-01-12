package com.shoppingsystem.shopping_system.address.service;

import com.shoppingsystem.shopping_system.address.model.Address;


public interface AddressService {
    Address findAddressByUserId(Long userId);
    Address findById(Long userId);
    void save(Address address);
}
