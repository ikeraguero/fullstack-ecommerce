package com.shoppingsystem.shopping_system.address.service;

import com.shoppingsystem.shopping_system.address.model.Address;
import com.shoppingsystem.shopping_system.address.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressServiceImpl implements AddressService{

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public Address findAddressByUserId(Long userId) {
        return addressRepository.findAddressByUserId(userId);
    }

    @Override
    public Address findById(Long addressId) {
        return addressRepository.findById(addressId).orElseThrow(() -> new RuntimeException("Address not found"));
    }

    @Override
    public void save(Address address) {
        addressRepository.save(address);
    }
}
