package com.j200w.dbwiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private List<String> role = List.of();
}
