package com.shoppingsystem.shopping_system.user.service;

import com.shoppingsystem.shopping_system.user.model.User;

import java.util.List;

public interface UserService {
    boolean loginUser(String enteredPassword, String email);
    void save(User user);
    List<User> findAll();
    void delete(Long userId);
}
