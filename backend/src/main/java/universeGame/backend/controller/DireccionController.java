package universeGame.backend.controller;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import universeGame.backend.dto.DireccionDTO;
import universeGame.backend.mappers.DireccionMapper;
import universeGame.backend.model.Direccion;
import universeGame.backend.service.interfaces.DireccionService;

@RestController
@RequestMapping("/direccion")
@Tag(name = "Direccion", description = "Direccion API")
public class DireccionController {

    private DireccionService direccionService;

    @GetMapping("/usuario/{correoUsuario}")
    @Schema(description = "Obtener direccion por el correo del usuario")
    public ResponseEntity<DireccionDTO> obtenerDireccion(
           @PathVariable String correoUsuario
    ) {
        Direccion direccion = direccionService.getByCorreoUsuario(correoUsuario);
        DireccionDTO direccionDTO = DireccionMapper.INSTANCE.toDireccionDTO(direccion);
        return ResponseEntity.ok(direccionDTO);
    }

    @PostMapping("/crear/usuario/{correoUsuario}")
    @Schema(description = "Crear direccion por el correo del usuario")
    public ResponseEntity<DireccionDTO> crearDireccion(
           @PathVariable String correoUsuario,
           @RequestBody @Valid DireccionDTO direccionDTO
    ) {
        Direccion direccion = DireccionMapper.INSTANCE.toDireccion(direccionDTO);
        Direccion direccionSave = direccionService.save(correoUsuario, direccion);
        DireccionDTO direccionDTOSave = DireccionMapper.INSTANCE.toDireccionDTO(direccionSave);
        return ResponseEntity.ok(direccionDTOSave);
    }

    @PutMapping("/actualizar/usuario/{correoUsuario}")
    @Schema(description = "Actualizar direccion por el correo del usuario")
    public ResponseEntity<DireccionDTO> actualizarDireccion(
           @PathVariable String correoUsuario,
           @RequestBody @Valid DireccionDTO direccionDTO
    ) {
        Direccion direccion = DireccionMapper.INSTANCE.toDireccion(direccionDTO);
        Direccion direccionSave = direccionService.update(correoUsuario, direccion);
        DireccionDTO direccionDTOSave = DireccionMapper.INSTANCE.toDireccionDTO(direccionSave);
        return ResponseEntity.ok(direccionDTOSave);
    }

    //---- setters  ----------------

    @Autowired
    public void setDireccionService(DireccionService direccionService) {
        this.direccionService = direccionService;
    }
}
