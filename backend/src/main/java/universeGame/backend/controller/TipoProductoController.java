package universeGame.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import universeGame.backend.dto.TipoProductoDTO;
import universeGame.backend.mappers.TipoProductoMapper;
import universeGame.backend.model.TipoProducto;
import universeGame.backend.service.interfaces.TipoProductoService;

import java.util.List;

@RestController
@RequestMapping("/tipo-producto")
public class TipoProductoController {

    private TipoProductoService tipoProductoService;

    @GetMapping("/listar")
    public ResponseEntity<List<TipoProductoDTO>> listar() {
        List<TipoProducto> tipos =  tipoProductoService.listar();
        List<TipoProductoDTO> tiposDTO = TipoProductoMapper.INSTANCE.toTipoProductoDTOs(tipos);
        return ResponseEntity.ok(tiposDTO);
    }

    //-----setters-----
    @Autowired
    public void setTipoProductoService(TipoProductoService tipoProductoService) {
        this.tipoProductoService = tipoProductoService;
    }
}
