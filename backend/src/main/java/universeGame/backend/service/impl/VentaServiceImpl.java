package universeGame.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import universeGame.backend.exception.CustomException;
import universeGame.backend.model.*;
import universeGame.backend.repository.DetalleVentaRepository;
import universeGame.backend.repository.ProductoRepository;
import universeGame.backend.repository.VentaRepository;
import universeGame.backend.service.interfaces.CarritoService;
import universeGame.backend.service.interfaces.DireccionService;
import universeGame.backend.service.interfaces.UsuarioService;
import universeGame.backend.service.interfaces.VentaService;

import java.util.Date;
import java.util.List;

@Service
public class VentaServiceImpl implements VentaService {

    private VentaRepository ventaRepository;
    private UsuarioService usuarioService;
    private CarritoService carritoService;
    private DetalleVentaRepository detalleVentaRepository;
    private ProductoRepository productoRepository;
    private DireccionService direccionService;

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

    @Override
    public List<Venta> listarFiltroUsuario(String correoUsuario, String nombreProducto, boolean descFecha) {
        Usuario usuario = usuarioService.findByCorreo(correoUsuario);

        nombreProducto = nombreProducto.trim().toUpperCase().replaceAll("\\s+", " ");

        if (descFecha) {
            return ventaRepository.findUsuarioAndNombreProductoDesc(usuario.getId(), nombreProducto);
        } else {
            return ventaRepository.findUsuarioAndNombreProductoAsc(usuario.getId(), nombreProducto);
        }
    }

    @Override
    public List<Venta> repoteIndividual(String cliente, Date fechaInferior, Date fechaSuperior, boolean descFecha) {

        cliente = cliente.trim().toUpperCase().replaceAll("\\s+", " ");

        System.out.println("cliente: (" + cliente+ ")");

        if (descFecha) {
            return ventaRepository.reporteIndividualDesc(cliente, fechaInferior, fechaSuperior);
        } else {
            return ventaRepository.reporteIndividualAsc(cliente, fechaInferior, fechaSuperior);
        }
    }

    @Override
    @Transactional
    public Venta registrar(String correoUsuario, String observaciones) {
        //usuario
        Usuario usuario = usuarioService.findByCorreo(correoUsuario);

        if (observaciones == null) {
            observaciones = "";
        } else {
            observaciones = observaciones.trim().toLowerCase().replaceAll("\\s+", " ");
        }


        //creacion de la venta
        Venta venta = new Venta();
        venta.setUsuario(usuario);
        venta.setFecha(new java.util.Date());
        venta.setObservaciones(observaciones);
        venta.setTotal(0.0);

        //direccion
        Direccion direccion = direccionService.getByCorreoUsuario(usuario.getCorreo());
        venta.setDireccion(direccion.createDireccion());

        venta = ventaRepository.save(venta);

        //creacion de detalles venta
        venta.setTotal(crearDetallesVenta(venta, usuario));
        venta = ventaRepository.save(venta);

        //vaciar carrito
        carritoService.vaciarCarrito(usuario.getCorreo());

        return venta;
    }

    private Double crearDetallesVenta(Venta venta, Usuario usuario) {
        //Carrito
        Carrito carrito = carritoService.obtenerCarritoPorUsuario(usuario.getCorreo());

        List<DetalleCarrito> detallesCarrito = carrito.getDetalleCarrito();

        if(detallesCarrito.isEmpty()){
            throw new CustomException("The cart is empty");
        }

        Double total = 0.0;

        //creacion de detalles venta
        for (DetalleCarrito detalleCarrito : detallesCarrito) {
            //DetalleVenta
            DetalleVenta detalleVenta = new DetalleVenta();
            detalleVenta.setVenta(venta);
            detalleVenta.setProducto(detalleCarrito.getProducto());
            detalleVenta.setCantidad(detalleCarrito.getCantidad());
            detalleVentaRepository.save(detalleVenta);

            //actualizar stock
            Producto producto = detalleCarrito.getProducto();
            producto.setCantidad(producto.getCantidad() - detalleCarrito.getCantidad());

            if (producto.getCantidad() < 0) {
                throw new CustomException("Not enough stock for the product: " + producto.getNombre());
            }

            productoRepository.save(producto);

            //calculo del total
            total += detalleCarrito.getProducto().getPrecio() * detalleCarrito.getCantidad()*(1+detalleCarrito.getProducto().getImpuesto());
        }

        return total;

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

    @Autowired
    public void setCarritoService(CarritoService carritoService) {
        this.carritoService = carritoService;
    }

    @Autowired
    public void setDetalleVentaRepository(DetalleVentaRepository detalleVentaRepository) {
        this.detalleVentaRepository = detalleVentaRepository;
    }

    @Autowired
    public void setProductoRepository(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Autowired
    public void setDireccionService(DireccionService direccionService) {
        this.direccionService = direccionService;
    }
}
