package universeGame.backend.dto;

import lombok.*;

@Data
public class DireccionDTO {
    private Long id;
    private UsuarioDTO usuario;
    private String pais;
    private String region;
    private String ciudad;
    private String direccion;
}
