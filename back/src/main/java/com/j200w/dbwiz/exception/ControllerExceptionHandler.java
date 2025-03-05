package com.j200w.dbwiz.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@ControllerAdvice
@ResponseBody
/**
 * La classe ControllerExceptionHandler permet de gérer les exceptions
 * générées par les contrôleurs de l'API.
 */
public class ControllerExceptionHandler {

    /**
     * Gère les exceptions BadRequestException.
     * @param e
     * @param request
     * @return ErrorMessage
     */
    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage handleBadRequestException(BadRequestException e, WebRequest request) {
        ErrorMessage errorMessage = new ErrorMessage(
                HttpStatus.BAD_REQUEST.value(),
                new Date(),
                e.getMessage(),
                request.getDescription(false));

        return errorMessage;
    }

    /**
     * Gère les exceptions ResourceNotFoundException.
     * @param e
     * @param request
     * @return ErrorMessage
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ErrorMessage handleResourceNotFoundException(ResourceNotFoundException e, WebRequest request) {
        ErrorMessage errorMessage = new ErrorMessage(
                HttpStatus.NOT_FOUND.value(),
                new Date(),
                e.getMessage(),
                request.getDescription(false));

        return errorMessage;
    }

    /**
     * Gère les exceptions RuntimeException.
     * @param e
     * @param request
     * @return ErrorMessage
     */
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorMessage handleRuntimeException(RuntimeException e, WebRequest request) {
        ErrorMessage errorMessage = new ErrorMessage(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                new Date(),
                e.getMessage(),
                request.getDescription(false));

        return errorMessage;
    }

    /**
     * Gère les exceptions AuthenticationException.
     * @param e
     * @param request
     * @return ErrorMessage
     */
    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    public ErrorMessage handleAuthenticationException(AuthenticationException e, WebRequest request) {
        ErrorMessage errorMessage = new ErrorMessage(
                HttpStatus.UNAUTHORIZED.value(),
                new Date(),
                "Le couple identifiant/mot de passe est incorrect",
                request.getDescription(false));

        return errorMessage;
    }

    /**
     * Gère les exceptions AlreadyInUseException.
     * @param e
     * @param request
     * @return ErrorMessage
     */
    @ExceptionHandler(AlreadyInUseException.class)
    @ResponseStatus(value = HttpStatus.CONFLICT)
    public ErrorMessage handleAlreadyInUseException(AlreadyInUseException e, WebRequest request) {
        ErrorMessage errorMessage = new ErrorMessage(
                HttpStatus.CONFLICT.value(),
                new Date(),
                e.getMessage(),
                request.getDescription(false));

        return errorMessage;
    }

    /**
     * Gère les exceptions Exception.
     * @param e
     * @param request
     * @return ErrorMessage
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorMessage handleException(Exception e, WebRequest request) {
        ErrorMessage errorMessage = new ErrorMessage(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                new Date(),
                e.getMessage(),
                request.getDescription(false));

        return errorMessage;
    }
}
