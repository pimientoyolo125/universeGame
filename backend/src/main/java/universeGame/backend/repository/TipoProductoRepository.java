package universeGame.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import universeGame.backend.model.TipoProducto;

@Repository
public interface TipoProductoRepository extends JpaRepository<TipoProducto, Long> {

}
