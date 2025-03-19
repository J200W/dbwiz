package com.j200w.dbwiz.mail.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class Mail {
    private String mailFrom;
    private String mailTo;
    private String mailSubject;
    private List<Object> attachments;
}
