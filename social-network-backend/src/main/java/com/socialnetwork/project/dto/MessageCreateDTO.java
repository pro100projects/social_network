package com.socialnetwork.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class MessageCreateDTO {

    @JsonIgnore
    private Long userId;

    @NotNull
    @Min(value = 1, message = "ChatId cannot be less than one")
    private Long chatId;

    @NotBlank(message = "Message cannot be empty")
    private String text;
}
