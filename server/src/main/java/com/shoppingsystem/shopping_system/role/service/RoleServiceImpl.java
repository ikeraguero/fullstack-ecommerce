package com.shoppingsystem.shopping_system.role.service;

import com.shoppingsystem.shopping_system.role.exception.NoRoleFound;
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
        List<Role> roleList = roleRepository.findAll();
        if (roleList.isEmpty()) {
            throw new NoRoleFound("No role was found");
        }
        return roleList;
    }

    @Override
    public String findRoleNameById(int roleId) {
        return roleRepository.findRoleNameById(roleId);
    }

    @Override
    public Role findById(int roleId) {
        return roleRepository.findById(roleId).orElseThrow(() -> new RuntimeException("Role not found"));
    }

    @Override
    public List<Role> findRolesByUserIds(List<Long> userIds) {
        return roleRepository.findRolesByUserIds(userIds);
    }
}
