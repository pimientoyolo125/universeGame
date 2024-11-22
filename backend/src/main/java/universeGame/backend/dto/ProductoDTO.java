package universeGame.backend.dto;

import lombok.*;

@Data
public class ProductoDTO {

    private Long id;
    private String nombre;
    private String descripcion;
    private TipoProductoDTO tipoProducto;
    private String imagen;
    private Double precio;
    private String marca;
    private String color;
    private int modelo;
    private int cantidad;
    private Double impuesto;
}
