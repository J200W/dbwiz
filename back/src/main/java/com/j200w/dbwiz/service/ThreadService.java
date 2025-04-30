package com.j200w.dbwiz.service;

import com.j200w.dbwiz.dto.ThreadDTO;
import com.j200w.dbwiz.model.Thread;
import com.j200w.dbwiz.repository.DatabaseTableRepository;
import com.j200w.dbwiz.repository.MessageRepository;
import com.j200w.dbwiz.repository.ThreadRepository;
import com.j200w.dbwiz.service.interfaces.IThreadService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Data
public class ThreadService implements IThreadService {

    private final ThreadRepository threadRepository;

    private final MessageRepository messageRepository;

    private final DatabaseTableRepository databaseTableRepository;

    @Override
    public Thread getById(String id) {
        return threadRepository.findById(id).orElse(null);
    }

    @Override
    public void saveThread(Thread thread) {
        threadRepository.save(thread);
    }

    @Override
    public List<ThreadDTO> getThreadsByUser(String userId) {
        List<Thread> threads = threadRepository.findByUserIdOrderByDateDesc(userId);
        return threads.stream()
                .map(thread -> new ThreadDTO(thread.getId(), thread.getName(), thread.getDate()))
                .toList();
    }

    @Override
    public boolean deleteThread(String id) {
        try {
            messageRepository.deleteAllByThreadId(id);
            databaseTableRepository.deleteAllByThreadId(id);
            threadRepository.deleteById(id);
            return true;
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
}
