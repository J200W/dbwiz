package com.j200w.dbwiz.service.interfaces;

import com.j200w.dbwiz.payload.request.BuildRequest;

import java.util.Map;


public interface IChatService {

    Map<String, String> buildDatabase(BuildRequest buildRequest);

    Map<String, String> sendMessage(String message, String threadId);

}
