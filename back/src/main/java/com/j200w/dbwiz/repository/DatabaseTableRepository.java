package com.j200w.dbwiz.repository;

import com.j200w.dbwiz.model.DatabaseTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DatabaseTableRepository extends JpaRepository<DatabaseTable, String> {
    void deleteAllByThreadId(String threadId);
}
