package com.j200w.dbwiz.service.interfaces;

import com.j200w.dbwiz.payload.request.BuildRequest;

import java.util.Map;


public interface IGroqService {

    Map<String, String> buildDatabase(BuildRequest buildRequest);

    Map<String, String> sendMessage(String message, String threadId);

}
