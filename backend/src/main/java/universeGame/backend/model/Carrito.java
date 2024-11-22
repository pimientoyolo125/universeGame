package universeGame.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Entity
@Table(name = "carritos")
public class Carrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "idusuario")
    private Usuario usuario;

    @Column(name = "total")
    private Double total;

    @OneToMany(mappedBy = "carrito")
    private List<DetalleCarrito> detalleCarrito;
}
