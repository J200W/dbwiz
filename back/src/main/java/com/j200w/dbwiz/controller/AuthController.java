package com.j200w.dbwiz.controller;

import com.j200w.dbwiz.exception.AlreadyInUseException;
import com.j200w.dbwiz.exception.ResourceNotFoundException;
import com.j200w.dbwiz.model.ERole;
import com.j200w.dbwiz.model.Role;
import com.j200w.dbwiz.model.User;
import com.j200w.dbwiz.payload.request.RegisterRequest;
import com.j200w.dbwiz.payload.response.AuthResponse;
import com.j200w.dbwiz.security.jwt.JwtUtils;
import com.j200w.dbwiz.security.service.UserDetailsImpl;
import com.j200w.dbwiz.service.interfaces.IAuthService;
import com.j200w.dbwiz.service.interfaces.IRoleService;
import com.j200w.dbwiz.service.interfaces.IUserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
@Data
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    IAuthService authService;

    @Autowired
    IRoleService roleService;

    @Autowired
    IUserService userService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    private final String jwtTokenName = "jwtToken";

    /**
     * Enregistrer un utilisateur
     *
     * @param signUpRequest
     * @param response
     * @return
     */
    @RequestMapping("/signup")
    public AuthResponse signup(
            @Valid @RequestBody RegisterRequest signUpRequest,
            HttpServletResponse response
    ) {
        try {

            if (userService.existsByEmail(signUpRequest.getEmail())) {
                throw new AlreadyInUseException("Erreur: Email déjà utilisé!");
            }

            User user = new User(
                    signUpRequest.getFirstname(),
                    signUpRequest.getLastname(),
                    signUpRequest.getEmail(),
                    encoder.encode(signUpRequest.getPassword())
            );

            // Récupérer les roles de l'utilisateur et les ajouter à l'utilisateur
            Set<String> strRoles = signUpRequest.getRole();
            Set<Role> roles = new HashSet<>();

            if (strRoles == null) {
                Role userRole = roleService.findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new ResourceNotFoundException("Erreur: Le role n'est pas trouvé."));
                roles.add(userRole);
            }

            // Sinon, attribuer les roles spécifiés
            else {
                strRoles.forEach(role -> {
                    if (role.equals("admin")) {
                        Role adminRole = roleService.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new ResourceNotFoundException("Erreur: Le role n'est pas trouvé."));
                        roles.add(adminRole);
                    } else {
                        if (roleService.findByName(ERole.ROLE_USER).isPresent()) {
                            Role userRole = roleService.findByName(ERole.ROLE_USER).get();
                            roles.add(userRole);
                        }
                    }
                });
            }

            user.setRole(roles);
            userService.save(user);

            // Authentification de l'utilisateur avec l'email et le mot de passe
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signUpRequest.getEmail(), signUpRequest.getPassword()));

            // Mettre l'authentification dans le contexte de sécurité de Spring
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            // Créer un cookie HttpOnly contenant le JWT
            response.addCookie(authService.createCookie(jwtTokenName, jwt, 24 * 60 * 60));

            // Récupérer les détails de l'utilisateur authentifié
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            // Retourner un message de succès
            return new AuthResponse(
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    roles.stream().map(item -> item.getRole().toString()).collect(Collectors.toList()),
                    HttpStatus.CREATED.value());

        } catch (AlreadyInUseException e) {
            throw new AlreadyInUseException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Erreur: Erreur rencontrée lors de l'enregistrement de l'utilisateur --> " + e.getMessage());
        }
    }
}
