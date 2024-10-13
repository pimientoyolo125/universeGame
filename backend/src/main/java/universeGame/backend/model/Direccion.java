package universeGame.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "direccion")
public class Direccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "pais")
    private String pais;

    @Column(name = "region")
    private String region;

    @Column(name = "ciudad")
    private String ciudad;

    @Column(name = "direccion")
    private String direccion;

    @OneToOne
    @JoinColumn(name = "idusuario")
    private Usuario usuario;
}
