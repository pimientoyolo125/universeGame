package universeGame.backend.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalException {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(
            CustomException e,
            WebRequest request
    ){
        ErrorResponse error = new ErrorResponse();
        error.setMessage(e.getMessage());
        error.setCode(400);
        error.setRute(request.getDescription(false));

        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(
            Exception e,
            WebRequest request
    ){
        ErrorResponse error = new ErrorResponse();
        error.setMessage(e.getMessage());
        error.setCode(500);
        error.setRute(request.getDescription(false));

        return ResponseEntity.internalServerError().body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(
            MethodArgumentNotValidException ex,
            WebRequest request
    ) {
        ErrorResponse error = new ErrorResponse();
        error.setMessage("Errores de validación");
        error.setCode(400);
        error.setRute(request.getDescription(false));

        FieldError firstError = ex.getBindingResult().getFieldErrors().stream().findFirst().orElse(null);

        if (firstError != null) {
            error.setMessage(firstError.getField() + ": " + firstError.getDefaultMessage());
        }

        return ResponseEntity.badRequest().body(error);
    }
}
