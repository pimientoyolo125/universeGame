package universeGame.backend.dto;

import lombok.*;

import java.util.List;

@Data
public class CarritoDTO {
    private Long id;
    private Double total;
    private List<DetalleCarritoDTO> detalleCarrito;
}
