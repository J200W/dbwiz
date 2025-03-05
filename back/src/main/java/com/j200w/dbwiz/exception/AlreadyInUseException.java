package com.j200w.dbwiz.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception lancée lorsqu'une ressource est déjà utilisée
 * @see RuntimeException
 */
@ResponseStatus(value= HttpStatus.BAD_REQUEST)
public class AlreadyInUseException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public AlreadyInUseException(String msg) {
        super(msg);
    }

}