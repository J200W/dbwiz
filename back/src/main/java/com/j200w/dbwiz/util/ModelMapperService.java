package com.j200w.dbwiz.util;

import com.j200w.dbwiz.dto.MessageDTO;
import com.j200w.dbwiz.dto.ThreadDTO;
import com.j200w.dbwiz.dto.UserDTO;
import com.j200w.dbwiz.model.Message;
import com.j200w.dbwiz.model.Role;
import com.j200w.dbwiz.model.Thread;
import com.j200w.dbwiz.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Data
public class ModelMapperService implements IModelMapperService {

    @Override
    public ThreadDTO convertThreadToThreadDTO(Thread thread) {
        return new ThreadDTO(thread.getId(), thread.getName(), thread.getDate());
    }

    @Override
    public MessageDTO convertMessageToMessageDTO(Message message) {
        return new MessageDTO(message.getContent(), message.getRole());
    }

    @Override
    public UserDTO convertUserToUserDTO(User user) {
        return new UserDTO(user.getEmail(), user.getFirstName(), user.getLastName(), user.getRole().stream().map(Role::toString).toList());
    }
}
