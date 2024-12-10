package com.shoppingsystem.shopping_system.user.service;

import com.shoppingsystem.shopping_system.user.model.User;
import com.shoppingsystem.shopping_system.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void registerUser(User user) {

        String hashedPassword = BCrypt.hashpw(user.getPasswordHash(), BCrypt.gensalt());
        user.setPasswordHash(hashedPassword);


        userRepository.save(user);
    }

    public boolean validatePassword(String enteredPassword, String storedPasswordHash) {
        return BCrypt.checkpw(enteredPassword, storedPasswordHash);
    }

    public boolean loginUser(String enteredPassword, String email) {
        User user = userRepository.findByEmail(email);
        if (user != null && validatePassword(enteredPassword, user.getPasswordHash())) {
            return true;
        }
        return false;
    }
}
