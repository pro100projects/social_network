package com.socialnetwork.project.dto;

import com.socialnetwork.project.entity.enums.MessageStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class ChatMessageDTO {

    private Long chatId;

    private Long userId;

    private Long messageId;

    private String text;

    private LocalDateTime sentAt;

    private MessageStatus messageStatus;
}
