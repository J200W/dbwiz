package com.j200w.dbwiz.controller;

import com.j200w.dbwiz.payload.request.BuildRequest;
import com.j200w.dbwiz.security.service.UserDetailsImpl;
import com.j200w.dbwiz.service.interfaces.IAuthService;

import com.j200w.dbwiz.service.interfaces.IGroqService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/database")
@Data
public class ThreadController {

    @Autowired
    private IGroqService groqService;

    @Autowired
    private IAuthService authService;

    @PostMapping("/build-database")
    public Map<String, String> buildDatabase(
            @Valid @RequestBody BuildRequest buildRequest,
            HttpServletResponse response
    ) {
        try {
            Map<String, String> result = groqService.buildDatabase(buildRequest);
            response.setStatus(HttpServletResponse.SC_OK);
            return result;
        }
        catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/send-message")
    public Map<String, String> sendMessage(
            @RequestParam String message,
            @RequestParam String threadId,
            HttpServletResponse response
    ) {
        try {
            // Check si l'utilisateur est connecté
            UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            if (authService.getUserId(userDetails) == null) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return Map.of("error", "User not authenticated");
            }
            Map<String, String> result = groqService.sendMessage(message, threadId);
            response.setStatus(HttpServletResponse.SC_OK);
            return result;
        }
        catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
