package com.shoppingsystem.shopping_system.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.beans.factory.annotation.Value;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    @Value("${jwt.secretKey}")
    private String secretKey;
    private SecretKey secretKeyForSigning;

    @PostConstruct
    public void init() {
        if (secretKey == null || secretKey.isEmpty()) {
            throw new IllegalArgumentException("JWT secret key must not be null or empty.");
        }
        byte[] decodedKey = Base64.getDecoder().decode(secretKey);
        this.secretKeyForSigning = Keys.hmacShaKeyFor(decodedKey);
    }

    public String generateToken(String email, List<String> roles) {
        List<String> prefixedRoles = roles.stream()
                .map(role -> "ROLE_" + role)
                .collect(Collectors.toList());

        return Jwts.builder()
                .subject(email)
                .claim("roles", prefixedRoles)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 100 * 60 * 60 * 24)) // 1 hour
                .signWith(secretKeyForSigning, SignatureAlgorithm.HS256)
                .compact();
    }

    public List<GrantedAuthority> extractAuthorities(String token) {
        Claims claims = extractAllClaims(token);
        List<String> roles = claims.get("roles", List.class);


        return roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    public boolean validateToken(String token, String email) {
        return (email.equals(extractEmail(token)) && !isTokenExpired(token));
    }

    public String extractEmail(String token) {
        return Jwts.parser()
                .setSigningKey(secretKeyForSigning)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return Jwts.parser()
                .setSigningKey(secretKeyForSigning)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }

    public Claims extractAllClaims(String token) {
        JwtParser parser = Jwts.parser()
                .setSigningKey(secretKeyForSigning)
                .build();
        return parser.parseClaimsJws(token).getBody();
    }
}
