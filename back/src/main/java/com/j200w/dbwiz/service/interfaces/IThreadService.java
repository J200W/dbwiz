package com.j200w.dbwiz.service.interfaces;

import com.j200w.dbwiz.dto.ThreadDTO;
import com.j200w.dbwiz.model.Thread;

import java.util.List;

public interface IThreadService {
    Thread getById(String id);

    void saveThread(Thread thread);

    List<ThreadDTO> getThreadsByUser(String userId);

    boolean deleteThread(String id);
}
