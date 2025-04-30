package com.j200w.dbwiz.service.interfaces;

import com.j200w.dbwiz.security.service.UserDetailsImpl;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;

import java.util.List;

public interface IAuthService {

    ResponseCookie createCookieHttpOnly(String name, String value, int maxAge);

    List<String> getRoles(UserDetailsImpl userDetails);

    String getUserId(UserDetailsImpl userDetails);

    void deleteJwtCookie (HttpServletResponse response, String jwtTokenName);
}
