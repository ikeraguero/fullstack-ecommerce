package com.shoppingsystem.shopping_system.security;

import com.shoppingsystem.shopping_system.util.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


//configure spring boot to intercept requests and check for jwt
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Autowired
    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }


    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws ServletException, IOException {

        jakarta.servlet.http.Cookie[] cookies = request.getCookies();
        String token = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if("authToken".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        if(token != null) {
            String email = jwtUtil.extractEmail(token);

            if(email!=null && SecurityContextHolder.getContext().getAuthentication() == null) {
                if(jwtUtil.validateToken(token, email)) {
                    List<GrantedAuthority> authorities = jwtUtil.extractAuthorities(token);

                    Authentication authentication = new UsernamePasswordAuthenticationToken(
                            email, null, new ArrayList<>(authorities));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    if (authentication != null) {
                        System.out.println("Authenticated user: " + authentication.getName());
                        System.out.println("User roles: " + authentication.getAuthorities());
                    }
                    System.out.println(authentication);
                }
            }
        }
        chain.doFilter((ServletRequest) request, (ServletResponse) response);

    }
}
