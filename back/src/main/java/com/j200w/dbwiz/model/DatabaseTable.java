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
@Table(name="database")
@AllArgsConstructor
@NoArgsConstructor
public class DatabaseTable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name="date", nullable = false)
    @Builder.Default
    public LocalDateTime date = LocalDateTime.now();

    @Column(name="schema", nullable = false)
    private String schema;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="thread_id", nullable=false)
    private Thread thread;

    public Database(LocalDateTime date, String schema, Thread thread) {
        this.date = date;
        this.schema = schema;
        this.thread = thread;
    }
}
