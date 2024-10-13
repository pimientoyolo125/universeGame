package universeGame.backend.exception;

import org.springframework.http.ResponseEntity;
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
        error.setCodigo(400);
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
        error.setCodigo(500);
        error.setRute(request.getDescription(false));

        return ResponseEntity.internalServerError().body(error);
    }
}
