package universeGame.backend.dto;

import lombok.Data;

@Data
public class LoginResponseDTO {

    private String token;
    private String message;
}
