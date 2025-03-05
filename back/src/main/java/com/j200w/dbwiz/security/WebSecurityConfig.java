package com.j200w.dbwiz.security;

import com.j200w.dbwiz.security.jwt.AuthEntryPointJwt;
import com.j200w.dbwiz.security.jwt.AuthTokenFilter;
import com.j200w.dbwiz.security.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class WebSecurityConfig {
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    // Gestionnaire des erreurs d'authentification
    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    // Créer un filtre pour valider les jetons JWT
    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    /*
     * Cette méthode est utilisée pour créer un gestionnaire d'authentification
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    /*
     * Cette méthode est utilisée pour encoder le mot de passe de l'utilisateur
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /*
     * Cette méthode est utilisée pour configurer les règles de sécurité
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Désactiver la protection CSRF
        http.csrf(csrf -> csrf.disable())

                // Personnaliser la réponse pour les erreurs d'authentification
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))

                // Désactiver la gestion de session
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Autoriser les requêtes pour ...
                .authorizeHttpRequests(auth -> auth

                        // les chemins d'authentification et d'inscription (pour les utilisateurs non
                        // authentifiés)
                        .requestMatchers("/api/auth/**").permitAll()

                        // les chemins de documentation Swagger (pour les utilisateurs non authentifiés)
                        .requestMatchers("/swagger-ui.html").permitAll()
                        .requestMatchers("/swagger-ui/**").permitAll()
                        .requestMatchers("/v3/api-docs/**").permitAll()
                        .requestMatchers("/swagger-resources/**").permitAll()

                        // le chemin de l'API pour obtenir les informations de l'utilisateur actuel
                        .requestMatchers("/api/auth/me").authenticated()

                        // les autres chemins de l'API (pour les utilisateurs authentifiés)
                        .anyRequest().authenticated());

        // Ajouter un filtre pour valider les jetons JWT
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        // Retourner la configuration de sécurité
        return http.build();
    }
}
