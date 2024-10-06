package universeGame.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DetalleVentaDTO {
    private Long id;
    private Long idVenta;
    private ProductoDTO producto;
    private Integer cantidad;
}
