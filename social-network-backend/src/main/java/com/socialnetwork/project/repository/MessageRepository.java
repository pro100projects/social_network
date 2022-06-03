package com.socialnetwork.project.repository;

import com.socialnetwork.project.entity.Message;
import com.socialnetwork.project.repository.query.MessageQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query(value = MessageQuery.FIND_LAST_MESSAGE_IN_CHAT,
            nativeQuery = true)
    Optional<Message> findLastMessageInChat(@Param("chatId") Long chatId);
}
