package universeGame.backend.controller;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import universeGame.backend.dto.DetalleCarritoAgregarDTO;
import universeGame.backend.dto.DetalleCarritoDTO;
import universeGame.backend.mappers.DetalleCarritoMapper;
import universeGame.backend.model.DetalleCarrito;
import universeGame.backend.service.interfaces.DetalleCarritoService;

@RestController
@RequestMapping("/detalle-carrito")
@Tag(name = "DetalleCarrito", description = "DetalleCarrito API")
public class DetalleCarritoController {

    private DetalleCarritoService detalleCarritoService;

    @PostMapping("/agregar")
    @Schema(description = "Agregar un detalle al carrito")
    public ResponseEntity<DetalleCarritoDTO> agregarDetalleCarrito(
            @RequestBody @Valid DetalleCarritoAgregarDTO detalleCarritoAgregarDTO
            ) {
        DetalleCarrito detalleCarrito = detalleCarritoService.agregarDetalleCarrito(detalleCarritoAgregarDTO);
        return ResponseEntity.ok(DetalleCarritoMapper.INSTANCE.toDetalleCarritoDTO(detalleCarrito));
    }

    @PutMapping("/actualizar")
    @Schema(description = "Actualizar un detalle del carrito")
    public ResponseEntity<DetalleCarritoDTO> actualizarDetalleCarrito(
            @RequestParam Long idDetalleCarrito,
            @RequestParam Integer cantidad
            ) {
        DetalleCarrito detalleCarrito = detalleCarritoService.actualizarDetalleCarrito(idDetalleCarrito, cantidad);
        return ResponseEntity.ok(DetalleCarritoMapper.INSTANCE.toDetalleCarritoDTO(detalleCarrito));
    }

    @DeleteMapping("/eliminar/{idDetalleCarrito}")
    @Schema(description = "Eliminar un detalle del carrito")
    public ResponseEntity<Void> eliminarDetalleCarrito(
            @PathVariable Long idDetalleCarrito
            ) {
        detalleCarritoService.eliminarDetalleCarrito(idDetalleCarrito);
        return ResponseEntity.noContent().build();
    }




    // ------------------- Getters y Setters -------------------
    @Autowired
    public void setDetalleCarritoService(DetalleCarritoService detalleCarritoService) {
        this.detalleCarritoService = detalleCarritoService;
    }
}
