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

    List<Venta> reporteIndividual(String cliente, Date fechaInferior, Date fechaSuperior, boolean descFecha);

    List<Venta> reporte2B();

    List<Venta> reporteConjunto(String cliente, Date fechaInferior, Date fechaSuperior, boolean descFecha, List<String> sucursales);

}
