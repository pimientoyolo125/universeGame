package universeGame.backend.service.interfaces;

import universeGame.backend.model.Venta;

import java.util.List;

public interface VentaService {

    List<Venta> listarTodos();

    List<Venta> listarTodosFiltro(Long idProducto, boolean descFecha);

    List<Venta> listarTodosUsuario(String correoUsuario);

}
