package com.shoppingsystem.shopping_system.auth.service;

import com.shoppingsystem.shopping_system.auth.dto.LoginRequest;
import com.shoppingsystem.shopping_system.auth.dto.LoginResponse;
import com.shoppingsystem.shopping_system.auth.dto.RegisterRequest;
import com.shoppingsystem.shopping_system.auth.dto.RegisterResponse;
import com.shoppingsystem.shopping_system.auth.exceptions.EmailAlreadyExistsException;
import com.shoppingsystem.shopping_system.auth.exceptions.InvalidCredentialsException;
import com.shoppingsystem.shopping_system.role.model.Role;
import com.shoppingsystem.shopping_system.role.service.RoleService;
import com.shoppingsystem.shopping_system.security.exception.InvalidTokenException;
import com.shoppingsystem.shopping_system.security.exception.NoTokenFoundException;
import com.shoppingsystem.shopping_system.user.model.User;
import com.shoppingsystem.shopping_system.user.service.UserService;
import com.shoppingsystem.shopping_system.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
public class AuthServiceImpl implements AuthService {

    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private final UserService userService;

    @Autowired
    private final RoleService roleService;

    public AuthServiceImpl(JwtUtil jwtUtil, PasswordEncoder passwordEncoder,
                           UserService userService, RoleService roleService) {
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.roleService = roleService;
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest, HttpServletResponse response) throws InvalidCredentialsException {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        User user = userService.findByEmail(email);
        if(user == null || !userService.loginUser(password, email)) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        List<String> roles = List.of(user.getRole().getName());

        String token = jwtUtil.generateToken(email, roles);

        Cookie cookie = createAuthCookie(token, 3600);
        response.addCookie(cookie);

        return new LoginResponse(user.getId(), user.getFirstName(), user.getLastName(),
                    user.getEmail(), user.getRole().getName());
    }

    private Cookie createAuthCookie(String token, int maxAge) {
        Cookie cookie = new Cookie("authToken", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        return cookie;
    }

    @Override
    public RegisterResponse register(RegisterRequest registerRequest) throws EmailAlreadyExistsException {
        if (userService.existsByEmail(registerRequest.getEmail())) {
            throw new EmailAlreadyExistsException("Email is already taken");
        }

        User newUser = new User();
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
        newUser.setFirstName(registerRequest.getFirstName());
        newUser.setLastName(registerRequest.getLastName());
        newUser.setRole(getRoleForRegistration(registerRequest.getRoleId()));
        newUser.setActive(true);
        newUser.setCreatedAt(new Date());
        newUser.setUpdatedAt(new Date());

        userService.save(newUser);

        List<String> roles = List.of(newUser.getRole().getName());
        String token = jwtUtil.generateToken(newUser.getEmail(), roles);

        return new RegisterResponse(newUser.getId(), token,
                newUser.getFirstName(), newUser.getLastName(),
                newUser.getEmail(), newUser.getRole().getName());
    }

    private Role getRoleForRegistration(int roleId) {
        return roleId == 0 ? roleService.findById(2) : roleService.findById(roleId);
    }

    @Override
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("authToken", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge(0);
        cookie.setPath("/");

        response.addCookie(cookie);
        return ResponseEntity.ok().body("Logged out successfully");
    }

    @Override
    public LoginResponse getAuthStatus(HttpServletRequest request) {
        Cookie authTokenCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("authToken"))
                .findFirst()
                .orElse(null);

        if (authTokenCookie == null) {
            throw new NoTokenFoundException("No token was found");
        }

        String token = authTokenCookie.getValue();
        String email = jwtUtil.extractEmail(token);
        if (jwtUtil.validateToken(token, email)) {
            User user = userService.findByEmail(email);
            return new LoginResponse(user.getId(), user.getFirstName(), user.getLastName(),
                    user.getEmail(), user.getRole().getName());
        }
        throw new InvalidTokenException("Invalid token");
    }
}
