package universeGame.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "idtipoproducto")
    private TipoProducto tipoProducto;

    @Column(name = "imagen")
    private String imagen;

    @Column(name = "precio")
    private Double precio;

    @Column(name = "marca")
    private String marca;

    @Column(name = "color")
    private String color;

    @Column(name = "modelo")
    private int modelo;

    @Column(name = "cantidad")
    private int cantidad;

    @Column(name = "impuesto")
    private Double impuesto;
}
