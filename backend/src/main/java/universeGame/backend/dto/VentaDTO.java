package universeGame.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VentaDTO {
    private Long id;
    private Date fecha;
    private String observaciones;
    private UsuarioDTO usuario;
    private Double total;
    private List<DetalleVentaDTO> detalleVenta;
}
