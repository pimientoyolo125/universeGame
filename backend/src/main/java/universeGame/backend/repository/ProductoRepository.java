package universeGame.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import universeGame.backend.model.Producto;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    @Query("SELECT p.marca " +
            "FROM Producto p " +
            "GROUP BY p.marca " +
            "ORDER BY COUNT(p) DESC")
    List<String> findMarcas();
}
