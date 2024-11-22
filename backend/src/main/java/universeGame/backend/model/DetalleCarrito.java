package universeGame.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "detallecarrito")
public class DetalleCarrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "idcarrito")
    private Carrito carrito;

    @ManyToOne
    @JoinColumn(name = "idproducto")
    private Producto producto;

    @Column(name = "cantidad")
    private int cantidad;
}
