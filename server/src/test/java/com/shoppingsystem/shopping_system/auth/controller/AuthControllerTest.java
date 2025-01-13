package com.shoppingsystem.shopping_system.auth.controller;

import com.shoppingsystem.shopping_system.address.model.Address;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import com.shoppingsystem.shopping_system.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.event.annotation.BeforeTestExecution;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

    @Mock
    private AuthService authService;

    @Mock
    private RoleService roleService;

    @Mock
    private UserService userService;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthController authController;

    private MockMvc mockMvc;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
    }

    @Test
    public void testLoginSuccess() throws Exception {
        // input data for test
        LoginRequest loginRequest = new LoginRequest("user@example.com", "password");
        Address address = new Address();
        LoginResponse loginResponse = new LoginResponse(12L, "user", "test", loginRequest.getEmail(),
                "USER", address);

        when(authService.login(any(), any())).thenReturn(loginResponse);

        mockMvc.perform(post("/auth/login")
                .contentType("application/json")
                .content("{\"email\":\"user@example.com\", \"password\":\"password\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("user@example.com"));
    }

    @Test
    public void testRegisterSuccess() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest("user", "example",
                "user@example.com", "password", 1);

        RegisterResponse registerResponse = new RegisterResponse(1L, "token", registerRequest.getFirstName(),
                registerRequest.getLastName(), registerRequest.getEmail(), "USER");

        when(authService.register(any(RegisterRequest.class))).thenReturn(registerResponse);

        mockMvc.perform(post("/auth/register")
                .contentType("application/json")
                .content("{\"email\":\"user@example.com\", \"password\":\"password\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("user@example.com"));
    }

    @Test
    public void testRegisterEmailAlreadyExists() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest("user", "example",
                "user@example.com", "password", 1);

        when(authService.register(any(RegisterRequest.class)))
                .thenThrow(new EmailAlreadyExistsException("Email already exists"));

        mockMvc.perform(post("/auth/register")
                        .contentType("application/json")
                        .content("{\"email\":\"user@example.com\", \"password\":\"password\"}"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$").value("Email already exists"));
    }

    @Test
    public void testGetAuthStatusSuccess() throws Exception {
        LoginResponse loginResponse = new LoginResponse(12L, "user", "test", "user@example.com", "USER", null);

        when(authService.getAuthStatus(any(HttpServletRequest.class))).thenReturn(loginResponse);

        mockMvc.perform(get("/auth/status"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("user@example.com"));
    }

    @Test
    public void testGetAuthStatusInvalidToken() throws Exception {
        when(authService.getAuthStatus(any(HttpServletRequest.class)))
                .thenThrow(new InvalidTokenException("Invalid token"));

        mockMvc.perform(get("/auth/status"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").value("Invalid token"));
    }

    @Test
    public void testGetAuthStatusNoTokenFound() throws Exception {
        when(authService.getAuthStatus(any(HttpServletRequest.class)))
                .thenThrow(new NoTokenFoundException("No token found"));

        mockMvc.perform(get("/auth/status"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").value("No token found"));
    }
}
