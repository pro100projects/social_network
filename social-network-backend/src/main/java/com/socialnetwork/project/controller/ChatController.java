package com.socialnetwork.project.controller;

import com.socialnetwork.project.annotation.CurrentUser;
import com.socialnetwork.project.dto.*;
import com.socialnetwork.project.security.UserSecurity;
import com.socialnetwork.project.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("chats")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ChatController {

    private final ChatService chatService;

    @GetMapping
    public List<ChatListDTO> getAllChats(
            @CurrentUser UserSecurity userSecurity
    ) {
        return chatService.getAllChatsByUserId(userSecurity.getId());
    }

    @PostMapping("/get-chat")
    public ChatDTO getChatByUserOrElseCreate(
            @Valid @RequestBody ChatCreateDTO dto,
            @CurrentUser UserSecurity userSecurity
    ) {
        dto.setCurrentUserId(userSecurity.getId());
        return chatService.getChatByUserOrElseCreate(dto);
    }

    @PostMapping("/get-system-chat")
    public ChatDTO getSystemChatRoomByUserOrElseCreate(
            @CurrentUser UserSecurity userSecurity
    ) {
        return chatService.getSystemChatByUserIdOrElseCreate(userSecurity.getId());
    }

    @PostMapping
    public ChatDTO createChat(
            @Valid @RequestBody ChatCreateDTO dto,
            @CurrentUser UserSecurity userSecurity
    ) {
        dto.setCurrentUserId(userSecurity.getId());
        return chatService.createChat(dto);
    }

    @DeleteMapping
    public boolean deleteChat(
            @Valid @RequestBody ChatDeleteDTO dto,
            @CurrentUser UserSecurity userSecurity
    ) {
        dto.setUserId(userSecurity.getId());
        return chatService.deleteChat(dto);
    }
}
