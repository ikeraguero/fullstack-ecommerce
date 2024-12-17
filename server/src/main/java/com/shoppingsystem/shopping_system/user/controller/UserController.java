package com.shoppingsystem.shopping_system.user.controller;

import com.shoppingsystem.shopping_system.user.model.User;
import com.shoppingsystem.shopping_system.user.repository.UserRepository;
import com.shoppingsystem.shopping_system.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    List<User> getUsers() {
        return userService.findAll();
    }

    @DeleteMapping("/users/{userId}")
    void deleteUser(@PathVariable Long userId) {
        userService.delete(userId);
    }

    //TODO
//    @PatchMapping("/users/:userId")
//    User updateUser(@PathVariable Long userId, @RequestBody UserDTO userDTO) {
//
//        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
//
//        //TODO
//
//        userRepository.save(user);
//    }

}
