package com.socialnetwork.project.repository.query;

public interface ChatQuery {

    String FIND_ALL_CHATS_BY_USER_ID =
            "SELECT chat.id chatId, another_user.user_id anotherUserId, message.user_id userId, message.id messageId, message.text as text, message.sent_at sentAt, chat.created_at createdAt, " +
                    "       read_count.amountNotReadMessages " +
                    // -- SELECT ALL CHATS
                    "            FROM chats chat " +
                    // -- JOIN ALL CHATS FOR USER
                    "                JOIN chat_users user_chat " +
                    "                    ON chat.id = user_chat.chat_id " +
                    "                    AND user_chat.user_id = :userId " +
                    // -- JOIN ANOTHER USER FOR CHATS
                    "                JOIN chat_users another_user " +
                    "                    ON user_chat.chat_id = another_user.chat_id " +
                    "                    AND another_user.user_id != :userId " +
                    // -- JOIN LAST MESSAGE FOR CHAT
                    "                LEFT JOIN " +
                    "                ( " +
                    // -- SELECT UNIQUE MESSAGE FOR EACH CHAT
                    "                    SELECT DISTINCT ON (chat_id) chat_id, id, text, user_id, sent_at FROM " +
                    "                    ( " +
                    // -- SELECT ALL SORTED MESSAGE
                    "                        SELECT * FROM messages " +
                    "                        ORDER BY messages.chat_id, sent_at DESC " +
                    "                    ) ordered_message " +
                    "                ) AS message " +
                    "                    ON message.chat_id = chat.id " +
                    // -- JOIN AMOUNT OF NOT READ MESSAGE FOR ALL USER'S CHATS
                    "                    LEFT JOIN ( " +
                    // -- SELECT AMOUNT OF NOT READ MESSAGE FOR ALL USER'S CHATS
                    "                        SELECT messages.chat_id, COUNT(*) as amountNotReadMessages " +
                    "                        FROM messages " +
                    // -- JOIN ALL MESSAGE FOR ALL CHATS
                    "                            JOIN chat_users " +
                    "                                ON chat_users.user_id = :userId " +
                    "                                AND chat_users.chat_id = messages.chat_id " +
                    "                                AND messages.user_id != :userId " +
                    // -- JOIN ALL READ MESSAGE
                    "                            LEFT JOIN read_messages " +
                    "                               ON read_messages.message_id = messages.id " +
                    "                                    WHERE read_messages.user_id IS NULL " +
                    "                            GROUP BY messages.chat_id " +
                    "                        ) as read_count " +
                    "                            ON read_count.chat_id = message.chat_id " +
                    "                    ORDER BY message.sent_at, chat.created_at DESC NULLS LAST;";


    String FIND_CHAT_BY_USERS =
            "SELECT cr.* " +
                    "FROM chat_users ucr1" +
                    "   JOIN chat_users ucr2" +
                    "       ON ucr1.chat_id = ucr2.chat_id" +
                    "       AND (ucr1.user_id, ucr2.user_id) = (:userOne, :userTwo)" +
                    "   JOIN chats cr" +
                    "       ON cr.id = ucr1.chat_id";

    String EXISTS_CHAT_BY_USERS =
            "SELECT EXISTS(" +
                    "SELECT *" +
                    "   FROM chat_users ucr1" +
                    "       JOIN chat_users ucr2 " +
                    "           ON ucr1.chat_id = ucr2.chat_id" +
                    "           AND (ucr1.user_id, ucr2.user_id) = (:userOne, :userTwo)" +
                    ")";

    String FIND_CHAT_BY_MESSAGE_ID =
            "SELECT * FROM chats " +
                    "WHERE id = " +
                    "   (SELECT chat_id FROM messages " +
                    "       WHERE id = :messageId)";

    String IS_LAST_MESSAGE_IN_CHAT =
            "SELECT EXISTS(" +
                    "   SELECT * FROM (" +
                    "       SELECT messages.id" +
                    "       FROM chats" +
                    "       JOIN messages" +
                    "           ON messages.chat_id = :chatId" +
                    "           AND chats.id = messages.chat_id" +
                    "       ORDER BY messages.sent_at DESC" +
                    "       LIMIT 1" +
                    "    ) AS last_message" +
                    "    WHERE last_message.id = :messageId" +
                    ")";
}
