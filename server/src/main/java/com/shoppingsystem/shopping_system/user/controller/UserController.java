package com.shoppingsystem.shopping_system.user.controller;

import com.shoppingsystem.shopping_system.auth.exceptions.InvalidCredentialsException;
import com.shoppingsystem.shopping_system.pagination.dto.PaginationUserResponse;
import com.shoppingsystem.shopping_system.role.service.RoleService;
import com.shoppingsystem.shopping_system.user.dto.UserRequest;
import com.shoppingsystem.shopping_system.user.exception.UserNotFoundException;
import com.shoppingsystem.shopping_system.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        if (page < 0) {
            return ResponseEntity.badRequest().body("Page index must not be less than 0");
        }
        try {
            PaginationUserResponse paginationResponse = userService.getPaginatedUsers(page, size);
            return ResponseEntity.ok(paginationResponse);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @DeleteMapping("/users/{userId}")
    ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        try {
            System.out.println(userId);
            userService.delete(userId);
            return ResponseEntity.ok("User successfully deleted");
        } catch (InvalidCredentialsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e ) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }


    @PutMapping("/users")
    ResponseEntity<?> updateUser(@RequestBody UserRequest userRequest) {
        try {
            userService.updateUser(userRequest);
            return ResponseEntity.ok("User successfully updated");
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e ) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

}
