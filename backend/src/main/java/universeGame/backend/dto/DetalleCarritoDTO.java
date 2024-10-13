package universeGame.backend.dto;

import lombok.*;

@Data
public class DetalleCarritoDTO {
    private Long id;
    private Long idCarrito;
    private ProductoDTO producto;
    private Integer cantidad;
}
