package com.j200w.dbwiz.util;

import com.j200w.dbwiz.dto.MessageDTO;
import com.j200w.dbwiz.dto.ThreadDTO;
import com.j200w.dbwiz.dto.UserDTO;
import com.j200w.dbwiz.model.Message;
import com.j200w.dbwiz.model.Thread;
import com.j200w.dbwiz.model.User;

public interface IModelMapperService {
    ThreadDTO convertThreadToThreadDTO(Thread thread);

    MessageDTO convertMessageToMessageDTO(Message message);

    UserDTO convertUserToUserDTO(User user);
}
