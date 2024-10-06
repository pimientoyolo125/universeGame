package universeGame.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import universeGame.backend.model.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
