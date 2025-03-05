package com.j200w.dbwiz.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "role")
@AllArgsConstructor
@NoArgsConstructor
public class Role {
    @Id
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole role;
}
