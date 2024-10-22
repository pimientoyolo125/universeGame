package universeGame.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import universeGame.backend.model.Venta;

import java.util.List;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Long> {

    @Query(
            "SELECT v FROM Venta v " +
            "JOIN v.detalleVenta dv " +
            "WHERE (:idProducto IS NULL OR dv.producto.id = :idProducto) " +
            "ORDER BY v.fecha DESC"
    )
    List<Venta> listarTodosFiltroDesc(Long idProducto);

    @Query(
            "SELECT v FROM Venta v " +
            "JOIN v.detalleVenta dv " +
            "WHERE (:idProducto IS NULL OR dv.producto.id = :idProducto) " +
            "ORDER BY v.fecha ASC"
    )
    List<Venta> listarTodosFiltroAsc(Long idProducto);

}
