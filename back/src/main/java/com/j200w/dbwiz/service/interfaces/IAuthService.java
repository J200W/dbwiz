package com.j200w.dbwiz.service.interfaces;

import com.j200w.dbwiz.security.service.UserDetailsImpl;
import jakarta.servlet.http.Cookie;

import java.util.List;

public interface IAuthService {

    Cookie createCookie(String name, String value, int maxAge);

    List<String> getRoles(UserDetailsImpl userDetails);

    Integer getUserId(UserDetailsImpl userDetails);
}
