package com.socialnetwork.project.mapper;

import com.socialnetwork.project.dto.ChatDTO;
import com.socialnetwork.project.entity.Chat;
import org.mapstruct.Mapper;

@Mapper(uses = {UserMapper.class, MessageMapper.class})
public interface ChatMapper {

    ChatDTO toChatDTO(Chat chat);
}
