package universeGame.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "tipousuario")
public class TipoUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;
}
