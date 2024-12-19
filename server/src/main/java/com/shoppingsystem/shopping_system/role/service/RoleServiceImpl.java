package com.shoppingsystem.shopping_system.role.service;

import com.shoppingsystem.shopping_system.role.model.Role;
import com.shoppingsystem.shopping_system.role.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;


    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }
}
