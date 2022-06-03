package com.socialnetwork.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class MessageDTO {

    private Long id;

    private Long userId;

    private Long chatId;

    private String text;

    private String photo;

    private Long forwardId;

    @JsonProperty("isUpdated")
    private boolean isUpdated;

    private LocalDateTime sentAt;

    private Set<Long> readMessages;

    private Set<Long> likedMessages;
}
