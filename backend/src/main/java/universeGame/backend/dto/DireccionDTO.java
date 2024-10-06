package universeGame.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DireccionDTO {
    private Long id;
    private UsuarioDTO usuario;
    private String pais;
    private String region;
    private String ciudad;
    private String direccion;
}
