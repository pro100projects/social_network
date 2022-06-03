package com.socialnetwork.project.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class ChatDTO {

    private Long id;

    private Set<UserDTO> users;

    private List<MessageDTO> messages;

    private LocalDateTime createdAt;
}
