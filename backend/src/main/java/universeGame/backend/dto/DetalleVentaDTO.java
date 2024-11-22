package universeGame.backend.dto;

import lombok.*;

@Data
public class DetalleVentaDTO {
    private Long id;
    private Long idVenta;
    private ProductoDTO producto;
    private Integer cantidad;
}
