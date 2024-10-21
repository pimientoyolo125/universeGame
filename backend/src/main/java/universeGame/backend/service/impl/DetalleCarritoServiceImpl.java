package universeGame.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import universeGame.backend.dto.DetalleCarritoAgregarDTO;
import universeGame.backend.exception.CustomException;
import universeGame.backend.model.Carrito;
import universeGame.backend.model.DetalleCarrito;
import universeGame.backend.model.Producto;
import universeGame.backend.repository.CarritoRepository;
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
    private CarritoRepository carritoRepository;

    @Override
    public DetalleCarrito getById(Long idDetalleCarrito) {
        return detalleCarritoRepository
                .findById(idDetalleCarrito)
                .orElseThrow(() -> new CustomException("Detail not found"));
    }

    @Override
    @Transactional
    public DetalleCarrito agregarDetalleCarrito(DetalleCarritoAgregarDTO detalleCarritoAgregarDTO) {

        if(detalleCarritoAgregarDTO.getCantidad()<1){
            throw new CustomException("The quantity must be greater than 0");
        }

        Carrito carrito = carritoService.obtenerCarritoPorId(detalleCarritoAgregarDTO.getIdCarrito());
        Producto producto = productoService.getById(detalleCarritoAgregarDTO.getIdProducto());

        DetalleCarrito detalleCarrito = getCarritoAgrearDetalleCarrito(carrito, producto);

        detalleCarrito.setCantidad(detalleCarrito.getCantidad() + detalleCarritoAgregarDTO.getCantidad());

        validCantidad(detalleCarrito, producto);

        carrito = actualizarCarrito(carrito, detalleCarritoAgregarDTO.getCantidad(), producto);

        detalleCarrito.setCarrito(carrito);

        return detalleCarritoRepository.save(detalleCarrito);
    }

    @Override
    @Transactional
    public DetalleCarrito actualizarDetalleCarrito(Long idDetalleCarrito, Integer cantidad) {;

        if(cantidad<1){
            throw new CustomException("The quantity must be greater than 0");
        }

        DetalleCarrito detalleCarrito = getById(idDetalleCarrito);

        Producto producto = productoService.getById(detalleCarrito.getProducto().getId());

        Carrito carrito = carritoService.obtenerCarritoPorId(detalleCarrito.getCarrito().getId());

        carrito.setTotal(carrito.getTotal() - (producto.getPrecio() * detalleCarrito.getCantidad()));

        detalleCarrito.setCantidad(cantidad);

        validCantidad(detalleCarrito, producto);

        carrito = actualizarCarrito(carrito, cantidad, producto);

        detalleCarrito.setCarrito(carrito);

        return detalleCarritoRepository.save(detalleCarrito);
    }

    @Override
    @Transactional
    public void eliminarDetalleCarrito(Long idDetalleCarrito) {
        DetalleCarrito detalleCarrito = getById(idDetalleCarrito);

        Carrito carrito = carritoService.obtenerCarritoPorId(detalleCarrito.getCarrito().getId());

        Producto producto = productoService.getById(detalleCarrito.getProducto().getId());

        carrito.setTotal(carrito.getTotal() - (producto.getPrecio() * detalleCarrito.getCantidad()));

        carritoRepository.save(carrito);

        detalleCarritoRepository.deleteById(idDetalleCarrito);
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

    private Carrito actualizarCarrito(Carrito carrito, Integer cantidad, Producto producto) {
        carrito.setTotal(carrito.getTotal() + (producto.getPrecio() * cantidad));
        carrito = carritoRepository.save(carrito);
        return carrito;
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

    @Autowired
    public void setCarritoRepository(CarritoRepository carritoRepository) {
        this.carritoRepository = carritoRepository;
    }
}
