package com.shoppingsystem.shopping_system.security.exception;

public class NoTokenFoundException extends RuntimeException {
    public NoTokenFoundException(String message) {
        super(message);
    }
}
