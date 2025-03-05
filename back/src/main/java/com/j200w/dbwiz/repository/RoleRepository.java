package com.j200w.dbwiz.repository;

import com.j200w.dbwiz.model.ERole;
import com.j200w.dbwiz.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByRole(ERole name);
}
