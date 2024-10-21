package universeGame.backend.controller;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import universeGame.backend.dto.CarritoDTO;
import universeGame.backend.mappers.CarritoMapper;
import universeGame.backend.model.Carrito;
import universeGame.backend.service.interfaces.CarritoService;

@RestController
@RequestMapping("/carrito")
@Tag(name = "Carrito", description = "Carrito API")
public class CarritoController {

    private CarritoService carritoService;

    @GetMapping("/usuario/{correoUsuario}")
    @Schema(description = "Obtener carrito por el correo del usuario")
    public ResponseEntity<CarritoDTO> obtenerCarrito(
            @PathVariable @Parameter(description = "Correo del usuario")
            String correoUsuario
    ) {
        Carrito carrito = carritoService.obtenerCarritoPorUsuario(correoUsuario);
        CarritoDTO carritoDTO = CarritoMapper.INSTANCE.toCarritoDTO(carrito);
        return ResponseEntity.ok(carritoDTO);
    }

    @DeleteMapping("/usuario/vaciar/{correoUsuario}")
    @Schema(description = "Vaciar carrito por el correo del usuario")
    public ResponseEntity<CarritoDTO> vaciarCarrito(
            @PathVariable @Parameter(description = "Correo del usuario")
            String correoUsuario
    ) {
        Carrito carrito = carritoService.vaciarCarrito(correoUsuario);
        CarritoDTO carritoDTO = CarritoMapper.INSTANCE.toCarritoDTO(carrito);
        return ResponseEntity.ok(carritoDTO);
    }




    // ------------------- Getters y Setters -------------------

    @Autowired
    public void setCarritoService(CarritoService carritoService) {
        this.carritoService = carritoService;
    }
}
