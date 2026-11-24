package com.finevision.backend.exception;

import com.finevision.backend.dto.response.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException exception,
            HttpServletRequest request
    ) {

        Map<String, String> validationErrors = new LinkedHashMap<>();

        for (FieldError fieldError :
                exception.getBindingResult().getFieldErrors()) {

            validationErrors.putIfAbsent(
                    fieldError.getField(),
                    fieldError.getDefaultMessage()
            );
        }

        return buildErrorResponse(
                HttpStatus.BAD_REQUEST,
                "Request validation failed",
                request,
                validationErrors
        );
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolation(
            ConstraintViolationException exception,
            HttpServletRequest request
    ) {

        Map<String, String> validationErrors = new LinkedHashMap<>();

        exception.getConstraintViolations().forEach(
                violation -> validationErrors.put(
                        violation.getPropertyPath().toString(),
                        violation.getMessage()
                )
        );

        return buildErrorResponse(
                HttpStatus.BAD_REQUEST,
                "Request validation failed",
                request,
                validationErrors
        );
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleInvalidRequestBody(
            HttpMessageNotReadableException exception,
            HttpServletRequest request
    ) {

        return buildErrorResponse(
                HttpStatus.BAD_REQUEST,
                "Invalid or malformed request body",
                request,
                null
        );
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolation(
            DataIntegrityViolationException exception,
            HttpServletRequest request
    ) {

        log.error(
                "Database integrity violation at {}",
                request.getRequestURI(),
                exception
        );

        return buildErrorResponse(
                HttpStatus.CONFLICT,
                "The requested operation violates a data constraint",
                request,
                null
        );
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(
            NoResourceFoundException exception,
            HttpServletRequest request
    ) {

        return buildErrorResponse(
                HttpStatus.NOT_FOUND,
                "Requested resource was not found",
                request,
                null
        );
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleMethodNotSupported(
            HttpRequestMethodNotSupportedException exception,
            HttpServletRequest request
    ) {

        return buildErrorResponse(
                HttpStatus.METHOD_NOT_ALLOWED,
                "HTTP method is not supported for this endpoint",
                request,
                null
        );
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleMediaTypeNotSupported(
            HttpMediaTypeNotSupportedException exception,
            HttpServletRequest request
    ) {

        return buildErrorResponse(
                HttpStatus.UNSUPPORTED_MEDIA_TYPE,
                "Request content type is not supported",
                request,
                null
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(
            Exception exception,
            HttpServletRequest request
    ) {

        log.error(
                "Unhandled exception at [{}]",
                request.getRequestURI(),
                exception
        );

        return buildErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "An unexpected error occurred",
                request,
                null
        );
    }

    private ResponseEntity<ErrorResponse> buildErrorResponse(
            HttpStatus status,
            String message,
            HttpServletRequest request,
            Map<String, String> validationErrors
    ) {

        ErrorResponse response = ErrorResponse.builder()
                .success(false)
                .message(message)
                .path(request.getRequestURI())
                .timestamp(LocalDateTime.now())
                .validationErrors(validationErrors)
                .build();

        return ResponseEntity
                .status(status)
                .body(response);
    }
}