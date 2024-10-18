package universeGame.backend.service.interfaces;

import universeGame.backend.model.Producto;

import java.util.List;

public interface ProductoService {

    Producto getById(Long id);

    List<Producto> listarProductos();

    List<String> listarMarcas();

    List<Producto> listarProductosFiltrados(String nombre, String marca, Long idTipo, boolean ascendenteModelo);
}
