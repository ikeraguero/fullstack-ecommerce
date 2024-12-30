package com.shoppingsystem.shopping_system.role.repository;

import com.shoppingsystem.shopping_system.role.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    @Query("SELECT r.name FROM Role r WHERE r.id = :roleId")
    String findRoleNameById(@Param("roleId") int roleId);
}
