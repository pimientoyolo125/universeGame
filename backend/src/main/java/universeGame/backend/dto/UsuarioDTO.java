package universeGame.backend.dto;

import lombok.*;

@Data
public class UsuarioDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private String telefono;
    private TipoUsuarioDTO tipoUsuario;
}
