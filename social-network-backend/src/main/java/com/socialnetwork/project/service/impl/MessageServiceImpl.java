package com.socialnetwork.project.service.impl;

import com.socialnetwork.project.dto.*;
import com.socialnetwork.project.entity.Message;
import com.socialnetwork.project.entity.User;
import com.socialnetwork.project.entity.enums.MessageStatus;
import com.socialnetwork.project.exception.ChatException;
import com.socialnetwork.project.mapper.MessageMapper;
import com.socialnetwork.project.repository.MessageRepository;
import com.socialnetwork.project.repository.UserRepository;
import com.socialnetwork.project.service.MessageService;
import com.socialnetwork.project.util.ErrorCodeException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;

    private final MessageMapper messageMapper;

    private final UserRepository userRepository;

    @Override
    public Message sendMessage(MessageCreateDTO dto) {
        Message message = messageMapper.toEntity(dto);
        return messageRepository.save(message)
                .toBuilder()
                .messageStatus(MessageStatus.SENT)
                .build();
    }

    @Override
    public Message updateMessage(MessageUpdateDTO dto) {
        Message message = messageRepository.findById(dto.getMessageId()).orElseThrow();

        if (message.getUser().getId() != dto.getUserId()) {
            throw new ChatException(ErrorCodeException.USER_CANNOT_UPDATE_NOT_OWN_MESSAGE);
        }

        message = message.toBuilder()
                .text(dto.getText())
                .isUpdated(true)
                .build();
        return messageRepository.save(message)
                .toBuilder()
                .messageStatus(MessageStatus.UPDATED)
                .build();
    }

    @Override
    public Message deleteMessage(MessageDeleteDTO dto) {
        Message message = messageRepository.findById(dto.getMessageId()).orElseThrow();

        if (message.getUser().getId() != dto.getUserId()) {
            throw new ChatException(ErrorCodeException.USER_CANNOT_DELETE_NOT_OWN_MESSAGE);
        }

        messageRepository.delete(message);

        return message.toBuilder()
                .messageStatus(MessageStatus.DELETED)
                .build();
    }

    @Override
    public Message readMessage(MessageReadDTO dto) {
        Message message = messageRepository.findById(dto.getMessageId()).orElseThrow();

        if (message.getUser().getId() == dto.getUserId()) {
            throw new ChatException(ErrorCodeException.USER_CANNOT_READ_HIS_MESSAGE);
        }

        boolean isAlreadyRead = message.getReadMessages()
                .stream()
                .map(User::getId)
                .anyMatch(id -> id == dto.getUserId());
        if (isAlreadyRead) {
            return message;
        }

        message.getReadMessages().add(userRepository.findById(dto.getUserId()).orElseThrow());
        return messageRepository.save(message)
                .toBuilder()
                .messageStatus(MessageStatus.UPDATED)
                .build();
    }

    @Override
    public Message toggleLikeMessage(MessageLikeDTO dto) {
        Message message = messageRepository.findById(dto.getMessageId()).orElseThrow();

        if (message.getUser().getId() == dto.getUserId()) {
            throw new ChatException(ErrorCodeException.USER_CANNOT_READ_HIS_MESSAGE);
        }

        boolean isAlreadyLiked = message.getLikedMessages()
                .stream()
                .map(User::getId)
                .anyMatch(id -> id == dto.getUserId());
        boolean isLikeDTO = Boolean.TRUE.equals(dto.getIsLike());
        if (isAlreadyLiked == isLikeDTO) {
            return message;
        }

        if (isLikeDTO) {
            message.getLikedMessages().add(userRepository.findById(dto.getUserId()).orElseThrow());
        } else {
            message.getLikedMessages().remove(userRepository.findById(dto.getUserId()).orElseThrow());
        }
        return messageRepository.save(message)
                .toBuilder()
                .messageStatus(MessageStatus.UPDATED)
                .build();
    }

    @Override
    public MessageDTO getMessageById(Long messageId) {
        return messageMapper.toMessageDTO(
                messageRepository.findById(messageId).orElseThrow()
        );
    }
}