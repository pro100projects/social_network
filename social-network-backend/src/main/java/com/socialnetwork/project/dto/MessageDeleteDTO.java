package com.socialnetwork.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class MessageDeleteDTO {

    @NotNull
    @Min(value = 1, message = "MessageId cannot be less than one")
    private Long messageId;

    @JsonIgnore
    private Long userId;
}
