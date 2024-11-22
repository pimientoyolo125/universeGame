package universeGame.backend.service.interfaces;

import universeGame.backend.model.Carrito;

public interface CarritoService {

    Carrito obtenerCarritoPorUsuario(String correoUsuario);

    Carrito obtenerCarritoPorId(Long id);

    Carrito vaciarCarrito(String correoUsuario);

}
