package com.socialnetwork.project.dto;

import com.socialnetwork.project.util.ErrorCodeException;
import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

@Data
@Builder
@Jacksonized
public class ErrorDTO {

    private String message;

    private ErrorCodeException errorCode;
}
