package com.j200w.dbwiz.controller;

import com.j200w.dbwiz.exception.AlreadyInUseException;
import com.j200w.dbwiz.exception.ResourceNotFoundException;
import com.j200w.dbwiz.mail.model.Mail;
import com.j200w.dbwiz.mail.service.MailService;
import com.j200w.dbwiz.model.ERole;
import com.j200w.dbwiz.model.Role;
import com.j200w.dbwiz.model.User;
import com.j200w.dbwiz.payload.request.LoginRequest;
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
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;


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
    MailService mailService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    private final String jwtTokenName = "jwtToken";

    /**
     * Enregistrer un utilisateur
     *
     * @param signUpRequest RegisterRequest
     * @param response HttpServletResponse
     * @return AuthResponse
     */
    @PostMapping("/register")
    public AuthResponse register(
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

            // Envoyer un email de bienvenue
            Mail mail = new Mail();
            mail.setMailTo(userDetails.getEmail());
            mail.setMailSubject("\uD83E\uDE84 Bienvenue sur DBWiz !");
            mailService.sendEmail(mail, "welcomeTemplate");


            // Retourner un message de succès
            return new AuthResponse(
                    "Vous êtes enregistré avec succès !",
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

    /**
     * Authentifier un utilisateur
     *
     * @param loginRequest RegisterRequest
     * @param response HttpServletResponse
     * @return AuthResponse
     */
    @PostMapping("/login")
    public AuthResponse login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletResponse response
    ) {
        try {
            // Authentification de l'utilisateur avec l'email et le mot de passe
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            // Mettre l'authentification dans le contexte de sécurité de Spring
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            ResponseCookie jwtCookie = ResponseCookie.from("jwtToken", jwt)
                    .path("/")
                    .maxAge(24 * 60 * 60)
                    .httpOnly(true)
                    .secure(false)
                    .build();

            response.addHeader("Set-Cookie", jwtCookie.toString());

            // Récupérer les détails de l'utilisateur authentifié
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            // Retourner un message de succès
            return new AuthResponse(
                    "Vous êtes connecté avec succès !",
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()),
                    HttpStatus.OK.value());

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    /**
     * Enregistrer un utilisateur avec Google
     *
     * @return AuthResponse
     */
    @RequestMapping("/signup-google")
    public AuthResponse signupGoogle() {
        return null;
    }

    /**
     * Authentifier un utilisateur avec Google
     *
     * @return AuthResponse
     */
    @RequestMapping("/login-google")
    public AuthResponse loginGoogle() {
        return null;
    }

    /**
     * Vérifier si un utilisateur est connecté
     *
     * @return AuthResponse
     */
    @GetMapping("/is-logged-in")
    public boolean isLoggedIn(HttpServletResponse response) {
        try {
            UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            return userDetails != null;
        } catch (ResourceNotFoundException e) {
//            response.addCookie(authService.createCookie(jwtTokenName, null, 0));
            throw new ResourceNotFoundException("Erreur: Utilisateur non connecté !");
        } catch (Exception e) {
//            response.addCookie(authService.createCookie(jwtTokenName, null, 0));
            throw new RuntimeException("Erreur: Erreur rencontrée lors de la vérification de l'utilisateur ! : " + e.getMessage());
        }
    }
}
