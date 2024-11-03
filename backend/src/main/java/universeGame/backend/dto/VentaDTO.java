package universeGame.backend.dto;

import lombok.*;

import java.util.Date;
import java.util.List;

@Data
public class VentaDTO {
    private Long id;
    private Date fecha;
    private String observaciones;
    private UsuarioDTO usuario;
    private Double total;
    private List<DetalleVentaDTO> detalleVenta;
    private String direccion;
}
