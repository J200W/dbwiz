package com.j200w.dbwiz.service;

import com.j200w.dbwiz.model.User;
import com.j200w.dbwiz.repository.UserRepository;
import com.j200w.dbwiz.service.interfaces.IUserService;

import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Data
public class UserService implements IUserService {
    private final UserRepository userRepository;

    @Override
    public void delete(Integer id) {
        this.userRepository.deleteById(id);
    }

    @Override
    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    @Override
    public User getById(Integer id) {
        return this.userRepository.findById(id).orElse(null);
    }

    @Override
    public User update(Integer id, User user) {
        user.setId(id);
        return this.userRepository.save(user);
    }

    @Override
    public User create(User user) {
        return this.userRepository.save(user);
    }

    @Override
    public User getByEmail(String email) {
        return this.userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public boolean existsById(Integer id) {
        return userRepository.existsById(id);
    }

    @Override
    public Optional<User> findById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }
}
