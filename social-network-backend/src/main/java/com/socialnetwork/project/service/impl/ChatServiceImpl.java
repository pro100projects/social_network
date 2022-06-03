package com.socialnetwork.project.service.impl;

import com.socialnetwork.project.dto.*;
import com.socialnetwork.project.entity.Chat;
import com.socialnetwork.project.entity.Message;
import com.socialnetwork.project.entity.User;
import com.socialnetwork.project.entity.enums.MessageStatus;
import com.socialnetwork.project.exception.ChatException;
import com.socialnetwork.project.mapper.ChatMapper;
import com.socialnetwork.project.mapper.MessageMapper;
import com.socialnetwork.project.mapper.UserMapper;
import com.socialnetwork.project.repository.ChatRepository;
import com.socialnetwork.project.repository.MessageRepository;
import com.socialnetwork.project.repository.UserRepository;
import com.socialnetwork.project.security.UserSecurity;
import com.socialnetwork.project.service.ChatService;
import com.socialnetwork.project.service.MessageService;
import com.socialnetwork.project.util.ErrorCodeException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ChatServiceImpl implements ChatService {

    private static final String USER_SOCKET_NOTIFICATION = "/ws-users/";
    private static final String CHAT_SOCKET_NOTIFICATION = "/ws-chats/messages/";

    private final ChatRepository chatRepository;
    private final ChatMapper chatMapper;

    private final MessageRepository messageRepository;
    private final MessageService messageService;
    private final MessageMapper messageMapper;

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final SimpMessagingTemplate template;
    @Value("${app.system-user-email}")
    private String systemUserEmail;

    private static void checkIfUserMemberOfChat(Chat chat, Long userId) throws ChatException {
        boolean isMemberOfChat = chat.getUsers()
                .stream()
                .anyMatch(u -> u.getId().equals(userId));
        if (!isMemberOfChat) {
            throw new ChatException(ErrorCodeException.NOT_MEMBER_OF_CHAT);
        }
    }

    @Override
    public ChatDTO getChatById(Long chatId, Long userId) {
        log.info("Find chat with chatId = {} and userId = {}", chatId, userId);

        Chat chat = getChatOrElseThrow(chatId);
        checkIfUserMemberOfChat(chat, userId);

        return chatMapper.toChatDTO(sortChatMessages(chat));
    }

    @Override
    @Transactional
    public ChatDTO getChatByUserOrElseCreate(ChatCreateDTO dto) {
        log.info("getChatRoomByUsersOrElseCreate by users with currentUserId = {}, and userId = {}", dto.getCurrentUserId(), dto.getUserId());

        if (dto.getCurrentUserId() == dto.getUserId()) {
            throw new BadCredentialsException("You can't chat with yourself");
        }
        Optional<Chat> chat = chatRepository.findChatByUsers(dto.getCurrentUserId(), dto.getUserId());
        if (chat.isEmpty()) {
            User user = userRepository.findById(dto.getCurrentUserId()).orElseThrow();
            User anotherUser = userRepository.findById(dto.getUserId()).orElseThrow();

            Chat entity = new Chat()
                    .toBuilder()
                    .users(Set.of(user, anotherUser))
                    .build();
            return chatMapper.toChatDTO(
                    chatRepository.save(entity)
            );
        }
        return chatMapper.toChatDTO(sortChatMessages(chat.get()));
    }

    @Override
    @Transactional
    public ChatDTO getSystemChatByUserIdOrElseCreate(Long userId) {
        log.info("Find system chat room by users with userId = {}", userId);

        User systemUser = userRepository.findByEmail(systemUserEmail).orElse(new User());
        Optional<Chat> chat = chatRepository.findChatByUsers(userId, systemUser.getId());
        if (chat.isEmpty()) {
            Chat entity = new Chat()
                    .toBuilder()
                    .users(Set.of(
                            userRepository.findById(userId).orElseThrow(),
                            systemUser
                    ))
                    .build();
            return chatMapper.toChatDTO(
                    chatRepository.save(entity)
            );
        }
        return chatMapper.toChatDTO(sortChatMessages(chat.get()));
    }

    @Override
    public List<ChatListDTO> getAllChatsByUserId(Long userId) {
        log.info("Get all chats by userId = {}", userId);
        var result = chatRepository.getAllChatsByUserId(userId);
        result = result.stream()
                .map(u -> {
                    User anotherUser = userRepository.findById(u.getAnotherUserId()).orElseThrow();
                    return u.toBuilder()
                            .avatar(anotherUser.getAvatar())
                            .name(anotherUser.getName())
                            .surname(anotherUser.getSurname())
                            .build();
                })
                .collect(Collectors.toList());
        return result;
    }

    @Override
    @Transactional
    public ChatDTO createChat(ChatCreateDTO dto) {
        log.info("Create chat");

        if (chatRepository.existsChatByUsers(dto.getCurrentUserId(), dto.getUserId())) {
            throw new ChatException(ErrorCodeException.CHAT_WITH_THESE_USERS_ALREADY_EXISTS);
        }

        Chat entity = new Chat()
                .toBuilder()
                .users(Set.of(
                        userRepository.findById(dto.getCurrentUserId()).orElseThrow(),
                        userRepository.findById(dto.getUserId()).orElseThrow()
                ))
                .build();

        return chatMapper.toChatDTO(
                chatRepository.save(entity)
        );
    }

    @Override
    @Transactional
    public boolean deleteChat(ChatDeleteDTO dto) {
        log.info("Delete chat");

        Chat chat = getChatOrElseThrow(dto.getChatId());
        checkIfUserMemberOfChat(chat, dto.getUserId());

        chatRepository.deleteById(chat.getId());

        return true;
    }

    @Override
    @Transactional
    public MessageDTO sendMessage(MessageCreateDTO dto) {
        log.info("Send message");

        Chat chat = getChatOrElseThrow(dto.getChatId());
        checkIfUserMemberOfChat(chat, dto.getUserId());

        Message sendMessage = messageService.sendMessage(dto);

        User anotherUser = getAnotherUserIdFromChat(chat, dto.getUserId());
        template.convertAndSend(USER_SOCKET_NOTIFICATION + anotherUser.getId(), convertToChatMessageStatusDTO(chat.getId(), sendMessage, MessageStatus.SENT));
        template.convertAndSend(CHAT_SOCKET_NOTIFICATION + dto.getChatId(), convertToChatMessageStatusDTO(chat.getId(), sendMessage, MessageStatus.SENT));

        return messageMapper.toMessageDTO(sendMessage);
    }

    @Override
    @Transactional
    public MessageDTO updateMessage(MessageUpdateDTO dto) {
        log.info("Update message");

        Chat chat = chatRepository.findChatByMessageId(dto.getMessageId())
                .orElseThrow(() -> new ChatException(ErrorCodeException.MESSAGE_NOT_FOUND));
        checkIfUserMemberOfChat(chat, dto.getUserId());

        Message updateMessage = messageService.updateMessage(dto);
        if (chatRepository.isLastMessageInChat(chat.getId(), updateMessage.getId())) {
            User anotherUser = getAnotherUserIdFromChat(chat, dto.getUserId());
            template.convertAndSend(USER_SOCKET_NOTIFICATION + anotherUser.getId(), convertToChatMessageStatusDTO(chat.getId(), updateMessage, MessageStatus.UPDATED));
        }
        template.convertAndSend(CHAT_SOCKET_NOTIFICATION + chat.getId(), convertToChatMessageStatusDTO(chat.getId(), updateMessage, MessageStatus.UPDATED));

        return messageMapper.toMessageDTO(updateMessage);
    }

    @Override
    @Transactional
    public MessageDTO deleteMessage(MessageDeleteDTO dto) {
        log.info("Delete message");

        Chat chat = chatRepository.findChatByMessageId(dto.getMessageId())
                .orElseThrow(() -> new ChatException(ErrorCodeException.MESSAGE_NOT_FOUND));
        checkIfUserMemberOfChat(chat, dto.getUserId());

        boolean isLastMessage = chatRepository.isLastMessageInChat(chat.getId(), dto.getMessageId());

        Message deletedMessage = messageService.deleteMessage(dto);

        if (isLastMessage) {
            var lastMessage = messageRepository.findLastMessageInChat(chat.getId());
            var chatMessageDTO = convertToChatMessageStatusDTO(chat.getId(), lastMessage.orElse(null), MessageStatus.DELETED);
            var anotherUser = getAnotherUserIdFromChat(chat, dto.getUserId());
            template.convertAndSend(USER_SOCKET_NOTIFICATION + anotherUser.getId(), chatMessageDTO);
        }
        template.convertAndSend(CHAT_SOCKET_NOTIFICATION + chat.getId(), messageMapper.toMessageDTO(deletedMessage));

        return messageMapper.toMessageDTO(deletedMessage);
    }

    @Override
    @Transactional
    public MessageDTO readMessage(MessageReadDTO dto) {
        log.info("Read message");

        Chat chat = chatRepository.findChatByMessageId(dto.getMessageId())
                .orElseThrow(() -> new ChatException(ErrorCodeException.MESSAGE_NOT_FOUND));
        checkIfUserMemberOfChat(chat, dto.getUserId());

        Message readMessage = messageService.readMessage(dto);

        //TODO: to user notification

        template.convertAndSend(CHAT_SOCKET_NOTIFICATION + chat.getId(), convertToChatMessageStatusDTO(chat.getId(), readMessage, MessageStatus.UPDATED));

        return messageMapper.toMessageDTO(readMessage);
    }

    @Override
    @Transactional
    public MessageDTO toggleLikeMessage(MessageLikeDTO dto) {
        log.info("Like message {}", dto.getIsLike());

        Chat chat = chatRepository.findChatByMessageId(dto.getMessageId())
                .orElseThrow(() -> new ChatException(ErrorCodeException.MESSAGE_NOT_FOUND));
        checkIfUserMemberOfChat(chat, dto.getUserId());

        Message changedMessage = messageService.toggleLikeMessage(dto);

        template.convertAndSend(CHAT_SOCKET_NOTIFICATION + chat.getId(), convertToChatMessageStatusDTO(chat.getId(), changedMessage, MessageStatus.UPDATED));

        return messageMapper.toMessageDTO(changedMessage);
    }

    private Chat sortChatMessages(Chat chat) {
        chat.setMessages(
                chat.getMessages().stream()
                        .sorted(Comparator.comparing(Message::getSentAt))
                        .collect(Collectors.toList())
        );
        return chat;
    }

    private Chat getChatOrElseThrow(Long chatId) {
        return chatRepository.findById(chatId)
                .orElseThrow(() -> new ChatException(ErrorCodeException.CHAT_NOT_FOUND));
    }

    private User getAnotherUserIdFromChat(Chat chat, Long userId) throws ChatException {
        return chat.getUsers()
                .stream()
                .filter(u -> !u.getId().equals(userId))
                .findFirst()
                .orElseThrow();
    }

    private ChatMessageDTO convertToChatMessageStatusDTO(Long chatId, Message message, MessageStatus messageStatus) {
        return new ChatMessageDTO()
                .toBuilder()
                .chatId(chatId)
                .messageId(message == null ? null : message.getId())
                .userId(message == null ? null : message.getUser().getId())
                .text(message == null ? null : message.getText())
                .sentAt(message == null ? null : message.getSentAt())
                .messageStatus(messageStatus)
                .build();
    }
}
