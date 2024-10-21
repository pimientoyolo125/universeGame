package universeGame.backend.service.interfaces;

import universeGame.backend.dto.DetalleCarritoAgregarDTO;
import universeGame.backend.model.DetalleCarrito;

public interface DetalleCarritoService {

    DetalleCarrito agregarDetalleCarrito(DetalleCarritoAgregarDTO detalleCarritoAgregarDTO);
}
