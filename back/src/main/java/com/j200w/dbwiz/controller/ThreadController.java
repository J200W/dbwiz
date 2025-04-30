package com.j200w.dbwiz.controller;

import com.j200w.dbwiz.dto.MessageDTO;
import com.j200w.dbwiz.dto.ThreadDTO;
import com.j200w.dbwiz.model.ERoleMessage;
import com.j200w.dbwiz.payload.request.ThreadIdRequest;
import com.j200w.dbwiz.repository.DatabaseTableRepository;
import com.j200w.dbwiz.security.service.UserDetailsImpl;
import com.j200w.dbwiz.service.interfaces.*;
import com.j200w.dbwiz.util.ModelMapperService;
import jakarta.servlet.http.HttpServletResponse;

import jakarta.validation.Valid;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.j200w.dbwiz.model.Thread;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/thread")
@Data
public class ThreadController {

    @Autowired
    private IGroqService groqService;

    @Autowired
    private IAuthService authService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IThreadService threadService;

    @Autowired
    private IMessageService messageService;

    @Autowired
    private ModelMapperService modelMapperService;


    @Autowired
    private DatabaseTableRepository databaseTableRepository;

    private boolean isValidThreadId(String threadId) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        Thread thread = threadService.getById(threadId);
        if (thread == null) {
            return true;
        }
        else return !thread.getUser().getId().equals(userDetails.getId());
    }

    @GetMapping("/build-project")
    public Map<String, String> buildProject(
            HttpServletResponse response
    ) {
        try {
            UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            Thread newThread = new Thread(
                    "Nouveau Projet",
                    userService.getById(userDetails.getId())
            );
            threadService.saveThread(newThread);
            messageService.sendMessage(
                    userDetails.getId(),
                    newThread,
                    "Bonjour, voici une version vierge de votre projet. Pensez à modifier le nom de votre projet si besoin !",
                    ERoleMessage.ai
            );
            response.setStatus(HttpServletResponse.SC_OK);
            return Map.of(
                    "threadId", newThread.getId(),
                    "message", "Projet créé avec succès !",
                    "status", "success"
            );
        }
        catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            System.out.println(e.getMessage());
            return Map.of(
                    "message", "Erreur lors de la création du projet: " + e.getMessage()
            );
        }
    }

    @PostMapping("/check-project")
    public Map<String, Object> checkProject(
            HttpServletResponse response,
            @RequestBody ThreadIdRequest threadId
    ) {
        try {
            if (isValidThreadId(threadId.getThreadId())) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                return Map.of(
                        "message", "Vous n'avez pas accès à ce projet",
                        "status", "error"
                );
            }
            Thread thread = threadService.getById(threadId.getThreadId());
            thread.setDate(LocalDateTime.now());
            threadService.saveThread(thread);
            ThreadDTO threadDTO = modelMapperService.convertThreadToThreadDTO(thread);
            response.setStatus(HttpServletResponse.SC_OK);
            return Map.of(
                    "message", "Le projet a été vérifié avec succès !",
                    "data", threadDTO,
                    "status", "success"
            );
        }
        catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            System.out.println(e.getMessage());
            return Map.of(
                    "message", "Le projet n'a pas pu être vérifié",
                    "status", "error"
            );
        }
    }

    @PostMapping("/get-messages")
    public List<MessageDTO> getMessages(
            HttpServletResponse response,
            @RequestBody ThreadIdRequest threadId
    ) {
        try {
            if (isValidThreadId(threadId.getThreadId())) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                return null;
            }
            response.setStatus(HttpServletResponse.SC_OK);
            return messageService.getMessagesByThread(threadId.getThreadId());
        }
        catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            System.out.println(e.getMessage());
            return null;
        }
    }


    @PostMapping("/send-message")
    public Map<String, String> getMessages(
            HttpServletResponse response,
            @RequestBody ThreadIdRequest threadId,
            @RequestBody MessageDTO messageDTO
    ) {
        try {
            if (isValidThreadId(threadId.getThreadId())) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                return null;
            }
            UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            Thread thread = threadService.getById(threadId.getThreadId());
            List<MessageDTO> messages = messageService.getMessagesByThread(threadId.getThreadId());
            // groqService.sendMessage(messages, messageDTO.getContent(), threadId.getThreadId());
            response.setStatus(HttpServletResponse.SC_OK);
            return Map.of(
                    "message", "Message envoyé avec succès !",
                    "status", "success"
            );
        }
        catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            System.out.println(e.getMessage());
            return Map.of(
                    "message", "Erreur lors de l'envoi du message",
                    "status", "error"
            );
        }
    }

    @GetMapping("/get-threads")
    public Map<String, Object> getThreads(HttpServletResponse response) {
        try {
            UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            List<ThreadDTO> threads = threadService.getThreadsByUser(userDetails.getId());
            response.setStatus(HttpServletResponse.SC_OK);
            return Map.of(
                    "data", threads,
                    "message", "Les projets ont été récupérés avec succès !",
                    "status", "success"
            );
        }
        catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            System.out.println(e.getMessage());
            return Map.of(
                    "message", "Erreur lors de la récupération des projets",
                    "status", "error"
            );
        }
    }

    @PutMapping("/update-thread")
    public Map<String, String> updateThread(
            HttpServletResponse response,
            @Valid @RequestBody ThreadDTO threadDTO
    ) {
        try {
            if (isValidThreadId(threadDTO.getId())) {
                throw new RuntimeException("Vous n'avez pas accès à ce projet");
            }
            if (threadDTO.getName() == null || threadDTO.getName().equals("")) {
                throw new RuntimeException("Champ vide");
            }
            Thread thread = threadService.getById(threadDTO.getId());
            thread.setName(threadDTO.getName());
            threadService.saveThread(thread);
            response.setStatus(HttpServletResponse.SC_OK);
            return Map.of(
                    "message", "Le projet a été mis à jour avec succès !",
                    "status", "success"
            );
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            System.out.println(e.getMessage());
            return Map.of(
                    "message", "Erreur lors de la mise à jour du projet",
                    "status", "error"
            );
        }
    }

    @PostMapping("/delete-thread")
    public Map<String, String> deleteThread(
            HttpServletResponse response,
            @RequestBody ThreadIdRequest threadId
    ) {
        try {
            if (isValidThreadId(threadId.getThreadId())) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                return null;
            }
            if (threadService.deleteThread(threadId.getThreadId())) {
                response.setStatus(HttpServletResponse.SC_OK);
                return Map.of(
                        "message", "Le projets a été supprimé avec succès !",
                        "status", "success"
                );
            }
            else {
                throw new RuntimeException("Suppression non réalisée...");
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            return Map.of(
                    "message", "Erreur lors de la suppression du projet",
                    "status", "error"
            );
        }
    }
}
