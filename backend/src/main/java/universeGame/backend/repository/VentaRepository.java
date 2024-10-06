package universeGame.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import universeGame.backend.model.Venta;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Long> {

}
