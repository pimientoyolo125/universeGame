package universeGame.backend.service.interfaces;

import universeGame.backend.model.Venta;

import java.util.Date;
import java.util.List;

public interface VentaService {

    List<Venta> listarTodos();

    List<Venta> listarTodosFiltro(Long idProducto, boolean descFecha);

    List<Venta> listarTodosUsuario(String correoUsuario);

    Venta registrar(String correoUsuario,String observaciones);

    List<Venta> listarFiltroUsuario(String correoUsuario, String nombreProducto, boolean descFecha);

    List<Venta> repoteIndividual(String cliente, Date fechaInferior, Date fechaSuperior,  boolean descFecha);

}
