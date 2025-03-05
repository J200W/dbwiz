package com.j200w.dbwiz.service;

import com.j200w.dbwiz.security.service.UserDetailsImpl;
import com.j200w.dbwiz.service.interfaces.IAuthService;
import jakarta.servlet.http.Cookie;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Data
public class AuthService implements IAuthService {
    @Override
    public Cookie createCookie(String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(maxAge);
        cookie.setPath("/");
        return cookie;
    }

    @Override
    public List<String> getRoles(UserDetailsImpl userDetails) {
        return userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
    }

    @Override
    public Integer getUserId(UserDetailsImpl userDetails) {
        return userDetails.getId();
    }
}
