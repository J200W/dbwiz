package com.j200w.dbwiz.service.interfaces;

import com.j200w.dbwiz.dto.MessageDTO;
import com.j200w.dbwiz.model.ERoleMessage;
import com.j200w.dbwiz.model.Thread;

import java.util.List;

public interface IMessageService {
    void sendMessage(String userId, Thread thread, String message, ERoleMessage role);

    List<MessageDTO> getMessagesByThread(String threadId);
}
