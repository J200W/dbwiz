package com.j200w.dbwiz.service;

import com.j200w.dbwiz.security.service.UserDetailsImpl;
import com.j200w.dbwiz.service.interfaces.IAuthService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Data
public class AuthService implements IAuthService {
    @Override
    public ResponseCookie createCookieHttpOnly(String name, String value, int maxAgeInSeconds) {
        return ResponseCookie.from(name, value)
                .httpOnly(true)
                .sameSite("Lax")
                .path("/")
                .maxAge(maxAgeInSeconds)
                .build();
    }


    @Override
    public List<String> getRoles(UserDetailsImpl userDetails) {
        return userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
    }

    @Override
    public String getUserId(UserDetailsImpl userDetails) {
        return userDetails.getId();
    }
}
