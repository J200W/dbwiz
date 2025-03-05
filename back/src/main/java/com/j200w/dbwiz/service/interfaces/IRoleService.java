package com.j200w.dbwiz.service.interfaces;

import com.j200w.dbwiz.model.ERole;
import com.j200w.dbwiz.model.Role;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface IRoleService {
    Optional<Role> findByName(ERole name);
}
