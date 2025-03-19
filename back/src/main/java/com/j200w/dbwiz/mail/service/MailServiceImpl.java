package com.j200w.dbwiz.mail.service;

import com.j200w.dbwiz.mail.model.Mail;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private final JavaMailSender javaMailSender;

    @Autowired
    private final TemplateEngine templateEngine;

    public MailServiceImpl(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    @Override
    public void sendEmail(Mail mail, String templateName)
    {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        Context thymeleafContext = new Context();
        try {
            thymeleafContext.setVariable("name", mail.getMailTo());
            thymeleafContext.setVariable("subject", mail.getMailSubject());
            String htmlContent = templateEngine.process(templateName, thymeleafContext);
            thymeleafContext.setVariable("message", htmlContent);

            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setSubject(mail.getMailSubject());
            mimeMessageHelper.setTo(mail.getMailTo());
            mimeMessageHelper.setText(htmlContent, true);

            javaMailSender.send(mimeMessageHelper.getMimeMessage());
        }
        catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
