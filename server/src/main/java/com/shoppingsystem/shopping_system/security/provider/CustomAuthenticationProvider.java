package com.shoppingsystem.shopping_system.security;

import com.shoppingsystem.shopping_system.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;

public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final JwtUtil jwtUtil;

    public CustomAuthenticationProvider(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String token = (String) authentication.getCredentials();
        String email = jwtUtil.extractEmail(token);

        if(jwtUtil.validateToken(token, email)) {

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, null, null);

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            return authenticationToken;
        } else {
            throw new AuthenticationException("Invalid Token") {};
        }
    }

    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
