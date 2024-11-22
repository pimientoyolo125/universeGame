package universeGame.backend.controller;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import universeGame.backend.dto.VentaDTO;
import universeGame.backend.mappers.VentaMapper;
import universeGame.backend.model.Venta;
import universeGame.backend.service.interfaces.VentaService;

import java.util.Date;
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

    @GetMapping("/listar/filtro/usuario")
    @Schema(description = "Lista con un filtro las ventas de un usuario")
    public ResponseEntity<List<VentaDTO>> listarFiltroUsuario(
            @RequestParam(value = "correoUsuario") String correoUsuario,
            @RequestParam(value = "nombre", required = false, defaultValue = "") String nombreProducto,
            @RequestParam(value = "descFecha", required = false, defaultValue = "true") Boolean descFecha
    ) {
        List<Venta> ventas = ventaService.listarFiltroUsuario(correoUsuario, nombreProducto, descFecha);
        List<VentaDTO> ventasDTO = VentaMapper.INSTANCE.toVentaDTOs(ventas);
        return ResponseEntity.ok(ventasDTO);
    }

    @PostMapping("/registrar")
    @Schema(description = "Registar una venta del carrito")
    public ResponseEntity<VentaDTO> registrar(
            @RequestParam(value = "correoUsuario") String correoUsuario,
            @RequestParam(value = "observaciones") String observaciones
    ) {
        Venta venta = ventaService.registrar(correoUsuario, observaciones);
        VentaDTO ventaDTO = VentaMapper.INSTANCE.toVentaDTO(venta);
        return ResponseEntity.ok(ventaDTO);
    }



    @GetMapping("/reporte-individual")
    @Schema(description = "Reporte individual de ventas")
    public ResponseEntity<List<VentaDTO>> reporteIndividual(
            @RequestParam(value = "cliente", required = false, defaultValue = "") String cliente,
            @RequestParam(value = "fechaInferior") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaInferior,
            @RequestParam(value = "fechaSuperior") @DateTimeFormat(pattern = "yyyy-MM-dd")Date fechaSuperior,
            @RequestParam(value = "totalDesc", required = false, defaultValue = "true") Boolean totalDesc
    ) {
        List<Venta> ventas = ventaService.reporteIndividual(cliente, fechaInferior, fechaSuperior, totalDesc);
        List<VentaDTO> ventasDTO = VentaMapper.INSTANCE.toVentaDTOs(ventas);
        return ResponseEntity.ok(ventasDTO);
    }

    @PostMapping("/reporte-conjunto")
    @Schema(description = "Reporte conjunto de ventas")
    public ResponseEntity<List<VentaDTO>> reporteConjunto(
            @RequestParam(value = "cliente", required = false, defaultValue = "") String cliente,
            @RequestParam(value = "fechaInferior") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaInferior,
            @RequestParam(value = "fechaSuperior") @DateTimeFormat(pattern = "yyyy-MM-dd")Date fechaSuperior,
            @RequestParam(value = "totalDesc", required = false, defaultValue = "true") Boolean totalDesc,
            @RequestBody List<String> sucursales
    ) {
        List<Venta> ventas = ventaService.reporteConjunto(cliente, fechaInferior, fechaSuperior, totalDesc, sucursales);
        List<VentaDTO> ventasDTO = VentaMapper.INSTANCE.toVentaDTOs(ventas);
        return ResponseEntity.ok(ventasDTO);
    }






    // ------------------- Getters y Setters -------------------

    @Autowired
    public void setVentaService(VentaService ventaService) {
        this.ventaService = ventaService;
    }
}
