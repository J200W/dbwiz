package com.j200w.dbwiz.service;

import com.j200w.dbwiz.model.ERoleMessage;
import com.j200w.dbwiz.model.Message;
import com.j200w.dbwiz.payload.request.BuildRequest;
import com.j200w.dbwiz.service.interfaces.IGroqService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class GroqService implements IGroqService {

    @Value("${spring.ai.openai.api-key}")
    private String apiKey;

    private final String endpoint = "https://api.groq.com/openai/v1/chat/completions";

    @Override
    public Map<String, String> buildDatabase(BuildRequest buildRequest) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "model", "llama3-70b-8192",
                "messages", List.of(
                        Map.of("role", "system", "content", "Tu es un expert en base de données."),
                        Map.of("role", "user", "content", generatePrompt(buildRequest))
                ),
                "temperature", 0.0
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(endpoint, entity, Map.class);
        List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
        String result = (String) ((Map<String, Object>) choices.get(0).get("message")).get("content");

        return Map.of("result", result);
    }

    private String generatePrompt(BuildRequest buildRequest) {
        return "Voici les informations fournies par le client : " + buildRequest.getDescription() +
                ". Contraintes : " + buildRequest.getConstraint() +
                ". Langage à utiliser : " + buildRequest.getLanguage() +
                ". Structure attendue : CREATE X {XX ... " +
                "\nDonne uniquement le code, sans commentaire ni explication ni mots inutiles.";
    }

    @Override
    public Map<String, String> sendMessage(String message, String threadId) {
        Message msg = new Message();
        msg.setRole(ERoleMessage.user);
        msg.setContent(message);
        return Map.of("message", msg.getContent());
    }
}
