package com.j200w.dbwiz.repository;

import com.j200w.dbwiz.model.Thread;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ThreadRepository extends JpaRepository<Thread, String> {
    List<Thread> findByUserIdOrderByDateDesc(String userId);
}
