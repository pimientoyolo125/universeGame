package universeGame.backend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UsuarioRegisterDTO {

    @NotNull(message = "El correo es requerido")
    @Size(max = 255)
    private String correo;

    @NotNull
    private String contrasena;

    @NotNull
    private String confirmarContrasena;

    @NotNull
    @Size(max = 255)
    private String nombre;

    @NotNull
    @Size(max = 255)
    private String apellido;

    @NotNull
    @Size(max = 255)
    private String telefono;
}
