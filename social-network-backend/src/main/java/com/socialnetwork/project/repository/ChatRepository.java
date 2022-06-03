package com.socialnetwork.project.repository;

import com.socialnetwork.project.dto.ChatListDTO;
import com.socialnetwork.project.entity.Chat;
import com.socialnetwork.project.repository.query.ChatQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {

    @Query(value = ChatQuery.FIND_ALL_CHATS_BY_USER_ID,
            nativeQuery = true)
    List<Map<String, Object>> findAllChatsByUserId(@Param("userId") Long userId);

    default List<ChatListDTO> getAllChatsByUserId(Long userId) {
        var resultObjects = findAllChatsByUserId(userId);
        return resultObjects.stream()
                .map(map -> new ChatListDTO()
                        .toBuilder()
                        .chatId(map.get("chatId") == null ? null : Long.parseLong(String.valueOf(map.get("chatId"))))
                        .anotherUserId(map.get("anotherUserId") == null ? null : Long.parseLong(String.valueOf(map.get("anotherUserId"))))
                        .userId(map.get("userId") == null ? null : Long.parseLong(String.valueOf(map.get("userId"))))
                        .messageId(map.get("messageId") == null ? null : Long.parseLong(String.valueOf(map.get("messageId"))))
                        .text(map.get("text") == null ? null : (String) map.get("text"))
                        .sentAt(map.get("sentAt") == null ? null : ((Timestamp) map.get("sentAt")).toLocalDateTime())
                        .createdAt(map.get("createdAt") == null ? null : ((Timestamp) map.get("createdAt")).toLocalDateTime())
                        .amountNotReadMessages(map.get("amountNotReadMessages") == null ? 0 : ((BigInteger) map.get("amountNotReadMessages")).intValue())
                        .build()
                )
                .collect(Collectors.toList());
    }

    @Query(value = ChatQuery.FIND_CHAT_BY_USERS,
            nativeQuery = true)
    Optional<Chat> findChatByUsers(@Param("userOne") Long userOne, @Param("userTwo") Long userTwo);

    @Query(value = ChatQuery.EXISTS_CHAT_BY_USERS,
            nativeQuery = true)
    boolean existsChatByUsers(@Param("userOne") Long userOne, @Param("userTwo") Long userTwo);

    @Query(value = ChatQuery.IS_LAST_MESSAGE_IN_CHAT,
            nativeQuery = true)
    boolean isLastMessageInChat(@Param("chatId") Long chatId, @Param("messageId") Long messageId);

    @Query(value = ChatQuery.FIND_CHAT_BY_MESSAGE_ID,
            nativeQuery = true)
    Optional<Chat> findChatByMessageId(@Param("messageId") Long messageId);
}
