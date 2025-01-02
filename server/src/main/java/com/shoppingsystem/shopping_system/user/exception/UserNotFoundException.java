package com.shoppingsystem.shopping_system.user.exception;

public class UserNotFoundException extends RuntimeException {
  public UserNotFoundException(String message) {
    super(message);
  }
}
