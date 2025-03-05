package com.j200w.dbwiz.security.jwt;

import com.j200w.dbwiz.security.service.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {
    // Le logger est utilisé pour afficher des informations sur l'exécution du
    // programme
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    // jwtSecret est la clé secrète utilisée pour signer le token JWT et pour le
    // valider
    @Value("${dbwiz.token.secret}")
    private String jwtSecret;

    // jwtExpirationMs est la durée de validité du token JWT
    @Value("${dbwiz.token.expiration}")
    private int jwtExpirationMs;

    /*
     * Cette méthode est utilisée pour générer un token JWT à partir de
     * l'authentification de l'utilisateur
     */
    public String generateJwtToken(Authentication authentication) {

        // Extraire les informations de l'utilisateur de l'authentification
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        // Générer un token JWT à partir du nom d'utilisateur de l'utilisateur
        return Jwts.builder()
                .setSubject((userPrincipal.getEmail()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    /*
     * Cette méthode est utilisée pour obtenir la clé secrète à partir de la clé
     * secrète
     * jwtSecret
     */
    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String getJwtFromCookies(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, "jwtToken");
        if (cookie != null) {
            return cookie.getValue();
        } else {
            return null;
        }
    }

    /*
     * Cette méthode est utilisée pour obtenir le nom d'utilisateur à partir du
     * token JWT
     */
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    /*
     * Cette méthode est utilisée pour valider un token JWT
     */
    public boolean validateJwtToken(String authToken) {
        try {
            // Valider le token JWT
            Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
            return true;
        } catch (MalformedJwtException e) {
            // Si le token JWT est mal formé
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            // Si le token JWT est expiré
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            // Si le token JWT est non supporté
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            // Si le token JWT est invalide
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        // Retourner false si le token JWT n'est pas valide
        return false;
    }
}
