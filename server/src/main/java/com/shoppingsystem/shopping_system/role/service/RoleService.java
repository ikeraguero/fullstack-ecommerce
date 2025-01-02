package com.shoppingsystem.shopping_system.role.service;

import com.shoppingsystem.shopping_system.role.model.Role;

import java.util.List;

public interface RoleService {
    List<Role> findAll();
    String findRoleNameById(int roleId);
    Role findById(int roleId);
    List<Role> findRolesByUserIds(List<Long> userIds);
}
