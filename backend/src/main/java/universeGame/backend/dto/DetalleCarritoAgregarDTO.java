package universeGame.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DetalleCarritoAgregarDTO {

    @NotNull
    private Long idCarrito;

    @NotNull
    private Long idProducto;

    @NotNull
    private Integer cantidad;
}
