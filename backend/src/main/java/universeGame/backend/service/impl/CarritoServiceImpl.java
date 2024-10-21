package universeGame.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import universeGame.backend.exception.CustomException;
import universeGame.backend.model.Carrito;
import universeGame.backend.model.Usuario;
import universeGame.backend.repository.CarritoRepository;
import universeGame.backend.repository.UsuarioRepository;
import universeGame.backend.service.interfaces.CarritoService;
import universeGame.backend.service.interfaces.UsuarioService;

@Service
public class CarritoServiceImpl implements CarritoService {

    private CarritoRepository carritoRepository;
    private UsuarioService usuarioService;

    @Override
    public Carrito obtenerCarritoPorUsuario(String correoUsuario) {

        Usuario usuario = usuarioService.findByCorreo(correoUsuario);

        return carritoRepository
                .findByUsuarioId(usuario.getId())
                .orElseThrow(
                        () -> new CustomException("Cart not found")
                );
    }


    // ------------------- Getters y Setters -------------------

    @Autowired
    public void setCarritoRepository(CarritoRepository carritoRepository) {
        this.carritoRepository = carritoRepository;
    }

    @Autowired
    public void setUsuarioService(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }
}
