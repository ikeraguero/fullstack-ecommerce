package com.shoppingsystem.shopping_system.role.controller;

import com.shoppingsystem.shopping_system.role.model.Role;
import com.shoppingsystem.shopping_system.role.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping("/roles")
    List<Role> getRoles() {
        return roleService.findAll();
    }
}
