package com.shoppingsystem.shopping_system.user.service;

import com.shoppingsystem.shopping_system.pagination.dto.PaginationUserResponse;
import com.shoppingsystem.shopping_system.user.dto.UserRequest;
import com.shoppingsystem.shopping_system.user.dto.UserResponse;
import com.shoppingsystem.shopping_system.user.model.User;

import java.util.List;

public interface UserService {
    boolean loginUser(String enteredPassword, String email);
    void save(User user);
    User findById(Long id);
    List<UserResponse> findAll();
    void delete(Long userId);
    void updatePassword(Long userId, String newPassword);
    void updateUser(UserRequest userRequest);
    User findByEmail(String email);
    PaginationUserResponse getPaginatedUsers(int page, int size);

    boolean existsByEmail(String email);
}
