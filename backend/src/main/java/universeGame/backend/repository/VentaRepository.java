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

    @Query(
            "SELECT v FROM Venta v " +
            "WHERE v.usuario.id = :idUsuario " +
            "ORDER BY v.fecha DESC"
    )
    List<Venta> findByUsuarioId(Long idUsuario);

    @Query(
            "select v from Venta v " +
            "inner join v.detalleVenta d " +
            "where v.usuario.id = :idUsuario " +
            "and d.producto.id in (select p.id from Producto p where UPPER(p.nombre) like CONCAT('%', :nombreProducto, '%')) " +
            "order by v.fecha desc"
    )
    List<Venta> findUsuarioAndNombreProductoDesc(Long idUsuario, String nombreProducto);

    @Query(
            "select v from Venta v " +
            "inner join v.detalleVenta d " +
            "where v.usuario.id = :idUsuario " +
            "and d.producto.id in (select p.id from Producto p where UPPER(p.nombre) like CONCAT('%', :nombreProducto, '%')) " +
            "order by v.fecha asc"
    )
    List<Venta> findUsuarioAndNombreProductoAsc(Long idUsuario, String nombreProducto);

}
