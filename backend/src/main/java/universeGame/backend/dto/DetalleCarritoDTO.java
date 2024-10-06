package universeGame.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DetalleCarritoDTO {
    private Long id;
    private Long idCarrito;
    private ProductoDTO producto;
    private Integer cantidad;
}
