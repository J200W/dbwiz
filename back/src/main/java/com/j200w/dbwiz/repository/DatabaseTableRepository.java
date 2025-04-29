package com.j200w.dbwiz.repository;

import com.j200w.dbwiz.model.Database;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DatabaseRepository extends JpaRepository<Database, String> {
    void deleteAllByThreadId(String threadId);
}
