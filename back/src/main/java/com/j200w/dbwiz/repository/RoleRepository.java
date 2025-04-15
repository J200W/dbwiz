package com.j200w.dbwiz.repository;

import com.j200w.dbwiz.model.ERole;
import com.j200w.dbwiz.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {
    Optional<Role> findByRole(ERole name);
}
