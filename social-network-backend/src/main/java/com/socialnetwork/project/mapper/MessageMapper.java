package com.socialnetwork.project.mapper;

import com.socialnetwork.project.dto.MessageCreateDTO;
import com.socialnetwork.project.dto.MessageDTO;
import com.socialnetwork.project.entity.Message;
import com.socialnetwork.project.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper
public interface MessageMapper {

    @Mappings({
            @Mapping(source = "userId", target = "user.id"),
            @Mapping(source = "chatId", target = "chat.id")
    })
    Message toEntity(MessageCreateDTO dto);

    @Named("usersToUsersId")
    default Set<Long> usersToUsersId(Set<User> users) {
        return users.stream()
                .map(User::getId)
                .collect(Collectors.toSet());
    }

    @Mappings({
            @Mapping(source = "user.id", target = "userId"),
            @Mapping(source = "chat.id", target = "chatId"),
            @Mapping(source = "updated", target = "isUpdated"),
            @Mapping(source = "readMessages", target = "readMessages", qualifiedByName = "usersToUsersId"),
            @Mapping(source = "likedMessages", target = "likedMessages", qualifiedByName = "usersToUsersId"),
    })
    MessageDTO toMessageDTO(Message message);

    @Mappings({
            @Mapping(source = "user.id", target = "userId"),
            @Mapping(source = "chat.id", target = "chatId"),
            @Mapping(source = "updated", target = "isUpdated"),
            @Mapping(source = "readMessages", target = "readMessages", qualifiedByName = "usersToUsersId"),
            @Mapping(source = "likedMessages", target = "likedMessages", qualifiedByName = "usersToUsersId"),
    })
    List<MessageDTO> toMessageDTO(List<Message> message);
}
