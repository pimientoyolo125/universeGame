package universeGame.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import universeGame.backend.model.Direccion;

import java.util.Optional;

@Repository
public interface DireccionRepository extends JpaRepository<Direccion, Long> {

    Optional<Direccion> findByUsuarioId(Long usuarioId);

    boolean existsByUsuarioId(Long usuarioId);

}
