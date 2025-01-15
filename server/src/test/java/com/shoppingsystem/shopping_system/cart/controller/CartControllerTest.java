package com.shoppingsystem.shopping_system.cart.controller;

import com.shoppingsystem.shopping_system.cart.dto.CartResponse;
import com.shoppingsystem.shopping_system.cart.service.CartService;
import com.shoppingsystem.shopping_system.user.service.UserService;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class CartControllerTest {

    @Mock
    private CartService cartService;

    @Mock
    private UserService userService;

    @InjectMocks
    private CartController cartController;

    private MockMvc mockMvc;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(cartController).build();
    }

    @Test
    public void testGetCartSuccess() throws Exception {
        CartResponse cartResponse = new CartResponse(1L, 12L, "Product1", 2, 100.0);

        when(cartService.findByUserId(12L)).thenReturn(cartResponse);

        mockMvc.perform(get("/api/cart/12"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productName").value("Product1"));
    }
}
