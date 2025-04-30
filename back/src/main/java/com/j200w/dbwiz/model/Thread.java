package com.j200w.dbwiz.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Builder
@Entity
@Data
@Table(name="thread")
@AllArgsConstructor
@NoArgsConstructor
public class Thread {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="date", nullable = false)
    @Builder.Default
    public LocalDateTime date = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", nullable=false)
    private User user;

    public Thread(String name, User user) {
        this.name = name;
        this.user = user;
        this.date = LocalDateTime.now();
    }
}
