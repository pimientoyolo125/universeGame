package universeGame.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UsuarioLoginDTO {

    @NotNull
    private String correo;

    @NotNull
    private String contrasena;
}
