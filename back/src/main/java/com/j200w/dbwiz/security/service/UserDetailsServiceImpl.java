package com.j200w.dbwiz.security.service;

import com.j200w.dbwiz.model.User;
import com.j200w.dbwiz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    /*
     * UserRepository est utilisé pour accéder aux utilisateur de la base de données
     */
    @Autowired
    UserRepository userRepository;

    /**
     * Cette méthode est utilisée pour charger les informations de l'utilisateur
     * avec son email à partir de la base de données lors de l'authentification
     *
     * @param email est l'email de l'utilisateur
     * @return UserDetails
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email or username: " + email));
        return UserDetailsImpl.build(user);
    }
}
