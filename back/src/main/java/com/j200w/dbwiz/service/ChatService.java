package com.j200w.dbwiz.service;

import com.j200w.dbwiz.payload.request.BuildRequest;
import com.j200w.dbwiz.service.interfaces.IChatService;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.util.Map;

@Service
public class ChatService implements IChatService {

    @Value("${spring.ai.openai.api-key}")
    private String apiKey;

    @Override
    public Map<String, String> buildDatabase(BuildRequest buildRequest) {
        String message =
                "Tu es développeur web et tu dois construire une base donnée pour un client. Voici les informations que te donne le client :" +
                buildRequest.getDescription() +
                ".\nConstruis dans ton message uniquement la base de donnée (sans explication ou mot inutile " +
                "'Voici la base de...' + interdiction de mettre un retour à la ligne au début de ton résultat) en " +
                "respectant les contraintes suivantes : "+
                buildRequest.getConstraint() + ".\n" +
                "La base de donnée doit être construite en utilisant le langage :" + buildRequest.getLanguage() + ".\n" +
                "Utilise cette structure pour la base de donnée (CREATE X {XX )";
        OpenAiApi openAiApi = new OpenAiApi("https://api.groq.com/openai", this.apiKey);
        OpenAiChatOptions openAiChatOptions = new OpenAiChatOptions();
        openAiChatOptions.setModel("llama3-70b-8192");
        openAiChatOptions.setTemperature(0.0);
        var chatModel = new OpenAiChatModel(openAiApi, openAiChatOptions);
        String result = chatModel.call(message);
        return Map.of("result", result);
    }
}
