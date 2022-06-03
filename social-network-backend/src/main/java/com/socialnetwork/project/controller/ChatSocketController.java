package com.socialnetwork.project.controller;

import com.socialnetwork.project.annotation.CurrentUser;
import com.socialnetwork.project.dto.*;
import com.socialnetwork.project.security.UserSecurity;
import com.socialnetwork.project.service.ChatService;
import com.socialnetwork.project.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ChatSocketController {

    private final MessageService messageService;
    private final ChatService chatService;

    @PostMapping("/chats/sendMessage")
    public MessageDTO sendMessage(
            @Valid @RequestBody MessageCreateDTO dto,
            @CurrentUser UserSecurity userSecurity
    ) {
        dto.setUserId(userSecurity.getId());
        MessageDTO message = chatService.sendMessage(dto);
        return messageService.getMessageById(message.getId());
    }

    @PutMapping("/chats/updateMessage")
    public MessageDTO updateMessage(
            @Valid @RequestBody MessageUpdateDTO dto,
            @CurrentUser UserSecurity userSecurity
    ) {
        dto.setUserId(userSecurity.getId());
        return chatService.updateMessage(dto);
    }

    @DeleteMapping("/chats/deleteMessage")
    public MessageDTO deleteMessage(
            @Valid @RequestBody MessageDeleteDTO dto,
            @CurrentUser UserSecurity userSecurity
    ) {
        dto.setUserId(userSecurity.getId());
        return chatService.deleteMessage(dto);
    }

    @PutMapping("/chats/readMessage")
    public MessageDTO readMessage(
            @Valid @RequestBody MessageReadDTO dto,
            @CurrentUser UserSecurity userSecurity
    ) {
        dto.setUserId(userSecurity.getId());
        return chatService.readMessage(dto);
    }

    @PutMapping("/chats/likeMessage")
    public MessageDTO readMessage(
            @Valid @RequestBody MessageLikeDTO dto,
            @CurrentUser UserSecurity userSecurity
    ) {
        dto.setUserId(userSecurity.getId());
        return chatService.toggleLikeMessage(dto);
    }
}
