package universeGame.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import universeGame.backend.exception.CustomException;
import universeGame.backend.model.Carrito;
import universeGame.backend.model.DetalleCarrito;
import universeGame.backend.model.Usuario;
import universeGame.backend.repository.CarritoRepository;
import universeGame.backend.repository.DetalleCarritoRepository;
import universeGame.backend.service.interfaces.CarritoService;
import universeGame.backend.service.interfaces.UsuarioService;

import java.util.ArrayList;
import java.util.List;

@Service
public class CarritoServiceImpl implements CarritoService {

    private CarritoRepository carritoRepository;
    private UsuarioService usuarioService;
    private DetalleCarritoRepository detalleCarritoRepository;

    @Override
    public Carrito obtenerCarritoPorUsuario(String correoUsuario) {

        Usuario usuario = usuarioService.findByCorreo(correoUsuario);

        return carritoRepository
                .findByUsuarioId(usuario.getId())
                .orElseThrow(
                        () -> new CustomException("Cart not found")
                );
    }

    @Override
    public Carrito obtenerCarritoPorId(Long id) {
        return carritoRepository
                .findById(id)
                .orElseThrow(
                        () -> new CustomException("Cart not found")
                );
    }

    @Override
    @Transactional
    public Carrito vaciarCarrito(String correoUsuario) {
        Carrito carrito = obtenerCarritoPorUsuario(correoUsuario);
        List<DetalleCarrito> detalles = carrito.getDetalleCarrito();

        if (detalles.isEmpty()) {
            return carrito;
        }

        for (DetalleCarrito detalle : detalles) {
            detalleCarritoRepository.deleteById(detalle.getId());
        }

        carrito.setTotal(0.0);
        carrito.setDetalleCarrito(new ArrayList<>());
        return carritoRepository.save(carrito);
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

    @Autowired
    public void setDetalleCarritoRepository(DetalleCarritoRepository detalleCarritoRepository) {
        this.detalleCarritoRepository = detalleCarritoRepository;
    }
}
