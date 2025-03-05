package com.j200w.dbwiz.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String fullname;
    private String email;
    private final List<String> roles;
    private Integer statusCode;
}
