package com.j200w.dbwiz.controller;

import com.j200w.dbwiz.payload.request.BuildRequest;
import com.j200w.dbwiz.service.interfaces.IChatService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/database")
@Data
public class ChatController {

    @Autowired
    private IChatService chatService;

    @RequestMapping("/build-database")
    public Map<String, String> buildDatabase(
            @Valid @RequestBody BuildRequest buildRequest,
            HttpServletResponse response
    ) {
        try {
            Map<String, String> result = chatService.buildDatabase(buildRequest);
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
