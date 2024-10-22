package universeGame.backend.controller;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import universeGame.backend.dto.VentaDTO;
import universeGame.backend.mappers.VentaMapper;
import universeGame.backend.model.Venta;
import universeGame.backend.service.interfaces.VentaService;

import java.util.List;

@RestController
@RequestMapping("/venta")
@Tag(name = "Venta", description = "Venta API")
public class VentaController {

    private VentaService ventaService;

    @GetMapping("/listar/todos")
    @Schema(description = "Lista todas las ventas")
    public ResponseEntity<List<VentaDTO>> listarTodos() {
        List<Venta> ventas = ventaService.listarTodos();
        List<VentaDTO> ventasDTO = VentaMapper.INSTANCE.toVentaDTOs(ventas);
        return ResponseEntity.ok(ventasDTO);
    }

    @GetMapping("/listar/todos/filtro")
    @Schema(description = "Lista todas las ventas con filtro, id y orden de fecha")
    public ResponseEntity<List<VentaDTO>> listarTodosFiltro(
            @RequestParam(value = "idProducto", required = false) Long idProducto,
            @RequestParam(value = "descFecha", required = false, defaultValue = "true") Boolean descFecha
    ) {
        List<Venta> ventas = ventaService.listarTodosFiltro(idProducto, descFecha );
        List<VentaDTO> ventasDTO = VentaMapper.INSTANCE.toVentaDTOs(ventas);
        return ResponseEntity.ok(ventasDTO);
    }

    @GetMapping("/listar/usuario/{correoUsuario}")
    @Schema(description = "Lista todas las ventas de un usuario")
    public ResponseEntity<List<VentaDTO>> listarTodosUsuario(
            @PathVariable(value = "correoUsuario") String correoUsuario
    ) {
        List<Venta> ventas = ventaService.listarTodosUsuario(correoUsuario);
        List<VentaDTO> ventasDTO = VentaMapper.INSTANCE.toVentaDTOs(ventas);
        return ResponseEntity.ok(ventasDTO);
    }
    





    // ------------------- Getters y Setters -------------------

    @Autowired
    public void setVentaService(VentaService ventaService) {
        this.ventaService = ventaService;
    }
}
