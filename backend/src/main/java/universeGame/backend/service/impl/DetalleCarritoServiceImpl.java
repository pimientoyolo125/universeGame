package universeGame.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import universeGame.backend.dto.DetalleCarritoAgregarDTO;
import universeGame.backend.exception.CustomException;
import universeGame.backend.model.Carrito;
import universeGame.backend.model.DetalleCarrito;
import universeGame.backend.model.Producto;
import universeGame.backend.repository.DetalleCarritoRepository;
import universeGame.backend.service.interfaces.CarritoService;
import universeGame.backend.service.interfaces.DetalleCarritoService;
import universeGame.backend.service.interfaces.ProductoService;

import java.util.Optional;

@Service
public class DetalleCarritoServiceImpl implements DetalleCarritoService {

    private DetalleCarritoRepository detalleCarritoRepository;
    private CarritoService carritoService;
    private ProductoService productoService;

    @Override
    @Transactional
    public DetalleCarrito agregarDetalleCarrito(DetalleCarritoAgregarDTO detalleCarritoAgregarDTO) {

        Carrito carrito = carritoService.obtenerCarritoPorId(detalleCarritoAgregarDTO.getIdCarrito());
        Producto producto = productoService.getById(detalleCarritoAgregarDTO.getIdProducto());

        DetalleCarrito detalleCarrito = getCarritoAgrearDetalleCarrito(carrito, producto);

        detalleCarrito.setCantidad(detalleCarrito.getCantidad() + detalleCarritoAgregarDTO.getCantidad());

        validCantidad(detalleCarrito, producto);

        return detalleCarritoRepository.save(detalleCarrito);
    }

    // validation

    private DetalleCarrito getCarritoAgrearDetalleCarrito(Carrito carrito, Producto producto) {
        Optional<DetalleCarrito> detalleCarritoOptional = detalleCarritoRepository.findByCarritoIdAndProductoId(carrito.getId(), producto.getId());

        if (detalleCarritoOptional.isPresent()) {
            return detalleCarritoOptional.get();
        }

        DetalleCarrito detalleCarrito = new DetalleCarrito();
        detalleCarrito.setCarrito(carrito);
        detalleCarrito.setProducto(producto);
        detalleCarrito.setCantidad(0);

        return detalleCarrito;
    }

    private void validCantidad(DetalleCarrito detalleCarrito, Producto producto) {
        if(detalleCarrito.getCantidad() > producto.getCantidad()) {
            throw new CustomException("Not enough product in stock");
        }
    }




    // ------------------- Getters y Setters -------------------
    @Autowired
    public void setDetalleCarritoRepository(DetalleCarritoRepository detalleCarritoRepository) {
        this.detalleCarritoRepository = detalleCarritoRepository;
    }

    @Autowired
    public void setCarritoService(CarritoService carritoService) {
        this.carritoService = carritoService;
    }

    @Autowired
    public void setProductoService(ProductoService productoService) {
        this.productoService = productoService;
    }
}
