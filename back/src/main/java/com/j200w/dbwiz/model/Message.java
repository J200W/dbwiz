package com.j200w.dbwiz.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@Table(name="message")
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="content", nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERoleMessage role;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="user_id", nullable=false)
    private User user;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="thread_id", nullable=false)
    private Thread thread;

    public Message( String content, ERoleMessage role, User user, Thread thread) {
        this.content = content;
        this.role = role;
        this.user = user;
        this.thread = thread;
    }
}
