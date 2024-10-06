package universeGame.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CarritoDTO {
    private Long id;
    private UsuarioDTO usuario;
    private Double total;
    private List<DetalleCarritoDTO> detalleCarrito;
}
