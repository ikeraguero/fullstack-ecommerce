package com.shoppingsystem.shopping_system.user.controller;

import com.shoppingsystem.shopping_system.role.service.RoleService;
import com.shoppingsystem.shopping_system.user.dto.UserRequest;
import com.shoppingsystem.shopping_system.user.dto.UserResponse;
import com.shoppingsystem.shopping_system.user.model.User;
import com.shoppingsystem.shopping_system.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    public UserController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/users")
    List<UserResponse> getUsers() {
        return userService.findAll();
    }

    @DeleteMapping("/users/{userId}")
    void deleteUser(@PathVariable Long userId) {
        userService.delete(userId);
    }


    @PutMapping("/users")
    void updateUser(@RequestBody UserRequest userRequest) {
        User existingUser = userService.findById(userRequest.getUserId());
        existingUser.setEmail(userRequest.getEmail());
        existingUser.setRole(roleService.findById(userRequest.getRoleId()));
        existingUser.setFirstName(userRequest.getFirstName());
        existingUser.setLastName(userRequest.getLastName());
        existingUser.setUpdatedAt(Date.from(Instant.now()));
        userService.updatePassword(userRequest.getUserId(), userRequest.getPassword());

        userService.save(existingUser);
    }

}
