package com.shoppingsystem.shopping_system.user.service;

import com.shoppingsystem.shopping_system.auth.exceptions.InvalidCredentialsException;
import com.shoppingsystem.shopping_system.role.model.Role;
import com.shoppingsystem.shopping_system.role.service.RoleService;
import com.shoppingsystem.shopping_system.user.dto.UserRequest;
import com.shoppingsystem.shopping_system.user.dto.UserResponse;
import com.shoppingsystem.shopping_system.user.exception.NoUserFoundException;
import com.shoppingsystem.shopping_system.user.exception.UserNotFoundException;
import com.shoppingsystem.shopping_system.user.model.User;
import com.shoppingsystem.shopping_system.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleService roleService;

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

    @Override
    public void save(User user) {
        userRepository.save(user);
    }


    @Override
    public void delete(Long userId) {
        if(userId == null) {
            throw new InvalidCredentialsException("User ID must not be null");
        }

        userRepository.deleteById(userId);
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    @Override
    public List<UserResponse> findAll() {
        List<User> userList = userRepository.findAll();
        if(userList.isEmpty()) {
            throw new NoUserFoundException("No user found");
        }

        Map<Integer, Role> roleMap = generateRoleMap(userList);

        return userList.stream()
                .map(user -> {
                    Role role = roleMap.get(user.getRole().getId());
                    return new UserResponse(user.getId(), user.getEmail(), "active", user.getFirstName(),
                            user.getLastName(), user.getPasswordHash(), role.getId(), role.getName());
                }).toList();
    }

    private Map<Integer, Role> generateRoleMap(List<User> userList) {
        List<Long> userIds = userList.stream().map(User::getId).toList();
        List<Role> roleList = roleService.findRolesByUserIds(userIds);
        return roleList.stream().collect(Collectors.toMap(
                Role::getId, role -> role
                ));
    }

    public void updateUser(UserRequest userRequest) {
        User existingUser = userRepository.findById(userRequest.getUserId())
                .orElseThrow(() -> new UserNotFoundException("Couldn't find user with ID - " + userRequest.getUserId()));
        existingUser.setEmail(userRequest.getEmail());
        existingUser.setRole(roleService.findById(userRequest.getRoleId()));
        existingUser.setFirstName(userRequest.getFirstName());
        existingUser.setLastName(userRequest.getLastName());
        existingUser.setUpdatedAt(Date.from(Instant.now()));
        updatePassword(userRequest.getUserId(), userRequest.getPassword());

        userRepository.save(existingUser);
    }

    public void updatePassword(Long userId, String newPassword) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        String hashedPassword = BCrypt.hashpw(newPassword, BCrypt.gensalt());
        user.setPasswordHash(hashedPassword);

        userRepository.save(user);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

}
