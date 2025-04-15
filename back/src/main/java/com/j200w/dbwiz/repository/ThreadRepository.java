package com.j200w.dbwiz.repository;

import com.j200w.dbwiz.model.Thread;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ThreadRepository extends JpaRepository<Thread, String> {
}
