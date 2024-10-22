package universeGame.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import universeGame.backend.model.Usuario;
import universeGame.backend.model.Venta;
import universeGame.backend.repository.VentaRepository;
import universeGame.backend.service.interfaces.UsuarioService;
import universeGame.backend.service.interfaces.VentaService;

import java.util.List;

@Service
public class VentaServiceImpl implements VentaService {

    private VentaRepository ventaRepository;
    private UsuarioService usuarioService;

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

    @Override
    public List<Venta> listarTodosUsuario(String correoUsuario) {

        Usuario usuario = usuarioService.findByCorreo(correoUsuario);

        return ventaRepository.findByUsuarioId(usuario.getId());
    }

    // ------------------- Getters y Setters -------------------

    @Autowired
    public void setVentaRepository(VentaRepository ventaRepository) {
        this.ventaRepository = ventaRepository;
    }

    @Autowired
    public void setUsuarioService(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }
}
