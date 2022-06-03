package com.socialnetwork.project.exception;

import com.socialnetwork.project.util.ErrorCodeException;
import lombok.Getter;

@Getter
public class ChatException extends RuntimeException {

    protected final ErrorCodeException errorCodeException;

    public ChatException(ErrorCodeException code) {
        super(code.getMessage());
        errorCodeException = code;
    }
}
