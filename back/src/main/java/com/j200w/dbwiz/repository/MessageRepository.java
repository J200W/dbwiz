package com.j200w.dbwiz.repository;

import com.j200w.dbwiz.model.Message;
import com.j200w.dbwiz.model.Thread;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findAllByThreadId(String threadId);

    void deleteAllByThreadId(String threadId);
}
