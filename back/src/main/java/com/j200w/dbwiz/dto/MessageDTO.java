package com.j200w.dbwiz.dto;

import com.j200w.dbwiz.model.ERoleMessage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MessageDTO {
    private String content;
    private ERoleMessage role;
}
