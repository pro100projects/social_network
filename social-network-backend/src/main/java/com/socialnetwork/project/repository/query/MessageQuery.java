package com.socialnetwork.project.repository.query;

public interface MessageQuery {

    String FIND_LAST_MESSAGE_IN_CHAT =
            "SELECT messages.* " +
                    "FROM chats" +
                    "   JOIN messages" +
                    "       ON messages.chat_id = :chatId" +
                    "       AND chats.id = messages.chat_id " +
                    "ORDER BY messages.sent_at DESC " +
                    "LIMIT 1";
}
