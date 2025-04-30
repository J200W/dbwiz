package com.j200w.dbwiz.service;

import com.j200w.dbwiz.dto.MessageDTO;
import com.j200w.dbwiz.model.ERoleMessage;
import com.j200w.dbwiz.model.Message;
import com.j200w.dbwiz.model.Thread;
import com.j200w.dbwiz.repository.MessageRepository;
import com.j200w.dbwiz.service.interfaces.IMessageService;
import com.j200w.dbwiz.service.interfaces.IThreadService;
import com.j200w.dbwiz.service.interfaces.IUserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@Data
public class MessageService implements IMessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private IThreadService threadService;

    @Autowired
    private IUserService userService;

    @Override
    public void sendMessage(String userId, Thread thread, String message, ERoleMessage role) {
        Message msg = new Message(
                message,
                role,
                userService.getById(userId),
                thread
        );

        messageRepository.save(msg);
    }

    @Override
    public List<MessageDTO> getMessagesByThread(String threadId) {
        return messageRepository.findAllByThreadId(threadId).stream().sorted(Comparator.comparing(Message::getId))
                .map(message -> new MessageDTO(
                        message.getContent(),
                        message.getRole()
                )).toList();
    }
}
