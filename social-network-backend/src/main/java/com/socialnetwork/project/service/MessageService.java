package com.socialnetwork.project.service;

import com.socialnetwork.project.dto.*;
import com.socialnetwork.project.entity.Message;

public interface MessageService {

    Message sendMessage(MessageCreateDTO dto);

    Message updateMessage(MessageUpdateDTO dto);

    Message deleteMessage(MessageDeleteDTO dto);

    Message readMessage(MessageReadDTO dto);

    Message toggleLikeMessage(MessageLikeDTO dto);

    MessageDTO getMessageById(Long messageId);
}
