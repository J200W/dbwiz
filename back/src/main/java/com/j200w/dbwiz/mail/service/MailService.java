package com.j200w.dbwiz.mail.service;

import com.j200w.dbwiz.mail.model.Mail;

public interface MailService {
    public void sendEmail(Mail mail, String templateName);
}
