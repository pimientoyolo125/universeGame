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


    @Query("SELECT p " +
            "FROM Producto p " +
            "WHERE (:nombre IS NULL OR UPPER(p.nombre) LIKE %:nombre%) " +
            "AND (:marcas IS NULL OR p.marca IN :marcas) " +
            "AND (:idTipo IS NULL OR p.tipoProducto.id = :idTipo) " +
            "ORDER BY p.modelo DESC ")
    List<Producto> findProductosFiltradosDesc(String nombre, List<String> marcas, Long idTipo);

    @Query("SELECT p " +
            "FROM Producto p " +
            "WHERE (:nombre IS NULL OR UPPER(p.nombre) LIKE %:nombre%) " +
            "AND (:marcas IS NULL OR p.marca IN :marcas) " +
            "AND (:idTipo IS NULL OR p.tipoProducto.id = :idTipo) " +
            "ORDER BY p.modelo ASC ")
    List<Producto> findProductosFiltradosAsc(String nombre, List<String> marcas, Long idTipo);
}
