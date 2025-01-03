package com.shoppingsystem.shopping_system.auth.service;

import com.shoppingsystem.shopping_system.auth.dto.LoginRequest;
import com.shoppingsystem.shopping_system.auth.dto.LoginResponse;
import com.shoppingsystem.shopping_system.auth.dto.RegisterRequest;
import com.shoppingsystem.shopping_system.auth.dto.RegisterResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest, HttpServletResponse response) throws Exception;
    RegisterResponse register(RegisterRequest registerRequest) throws Exception;
    ResponseEntity<?> logout(HttpServletResponse response);
    LoginResponse getAuthStatus(HttpServletRequest request);
}
