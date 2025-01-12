package com.shoppingsystem.shopping_system.auth.controller;

import com.shoppingsystem.shopping_system.auth.dto.LoginRequest;
import com.shoppingsystem.shopping_system.auth.dto.LoginResponse;
import com.shoppingsystem.shopping_system.auth.dto.RegisterRequest;
import com.shoppingsystem.shopping_system.auth.dto.RegisterResponse;
import com.shoppingsystem.shopping_system.auth.exceptions.EmailAlreadyExistsException;
import com.shoppingsystem.shopping_system.auth.service.AuthService;
import com.shoppingsystem.shopping_system.role.service.RoleService;
import com.shoppingsystem.shopping_system.security.exception.InvalidTokenException;
import com.shoppingsystem.shopping_system.security.exception.NoTokenFoundException;
import com.shoppingsystem.shopping_system.user.service.UserService;
import com.shoppingsystem.shopping_system.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {
            System.out.println(loginRequest);
            LoginResponse loginResponse = authService.login(loginRequest, response);
            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            RegisterResponse  registerResponse = authService.register(registerRequest);
            return ResponseEntity.ok(registerResponse);
        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @GetMapping("/status")
    public ResponseEntity<?> getAuthStatus(HttpServletRequest request) {
       try {
           LoginResponse loginResponse = authService.getAuthStatus(request);
           return ResponseEntity.ok(loginResponse);
       } catch (InvalidTokenException | NoTokenFoundException e) {
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
       } catch (Exception e) {
           return ResponseEntity.status(500).body(e.getMessage());
       }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        return authService.logout(response);
    }

}
