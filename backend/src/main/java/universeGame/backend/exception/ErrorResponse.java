package universeGame.backend.exception;

import lombok.Data;

@Data
public class ErrorResponse {

    private String message;
    private int codigo;
    private String rute;
}
