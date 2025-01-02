package com.shoppingsystem.shopping_system.role.controller;

import com.shoppingsystem.shopping_system.role.exception.NoRoleFound;
import com.shoppingsystem.shopping_system.role.model.Role;
import com.shoppingsystem.shopping_system.role.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    ResponseEntity<?> getRoles() {
        try {
            List<Role> roleList = roleService.findAll();
            return ResponseEntity.ok(roleList);
        } catch (NoRoleFound e) {
            return ResponseEntity.ok(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
