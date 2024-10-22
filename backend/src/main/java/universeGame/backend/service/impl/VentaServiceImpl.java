package universeGame.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import universeGame.backend.model.Venta;
import universeGame.backend.repository.VentaRepository;
import universeGame.backend.service.interfaces.VentaService;

import java.util.List;

@Service
public class VentaServiceImpl implements VentaService {

    private VentaRepository ventaRepository;

    @Override
    public List<Venta> listarTodos() {
        return ventaRepository.listarTodosFiltroDesc(null);
    }

    @Override
    public List<Venta> listarTodosFiltro(Long idProducto, boolean descFecha) {
        if (descFecha) {
            return ventaRepository.listarTodosFiltroDesc(idProducto);
        } else {
            return ventaRepository.listarTodosFiltroAsc(idProducto);
        }
    }

    // ------------------- Getters y Setters -------------------

    @Autowired
    public void setVentaRepository(VentaRepository ventaRepository) {
        this.ventaRepository = ventaRepository;
    }
}
