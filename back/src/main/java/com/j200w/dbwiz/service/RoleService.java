package com.j200w.dbwiz.service;

import com.j200w.dbwiz.model.ERole;
import com.j200w.dbwiz.model.Role;
import com.j200w.dbwiz.repository.RoleRepository;
import com.j200w.dbwiz.service.interfaces.IRoleService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
@Data
public class RoleService implements IRoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Optional<Role> findByName(ERole name) {
        return roleRepository.findByRole(name);
    }

}
