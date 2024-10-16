package universeGame.backend.controller;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import universeGame.backend.dto.UsuarioDTO;
import universeGame.backend.dto.UsuarioLoginDTO;
import universeGame.backend.dto.UsuarioRegisterDTO;
import universeGame.backend.mappers.UsuarioMapper;
import universeGame.backend.model.Usuario;
import universeGame.backend.service.interfaces.UsuarioService;

@RestController
@RequestMapping("/usuario")
@Tag(name = "Usuario", description = "Endpoints de usuarios")
public class UsuarioController {

    private UsuarioService usuarioService;

    @PostMapping("/registrar")
    @Schema(description = "Registrar un usuario")
    public ResponseEntity<UsuarioDTO> registrar(
            @RequestBody @Valid UsuarioRegisterDTO usuarioRegisterDTO
    ) {
        Usuario usuario = usuarioService.register(usuarioRegisterDTO);
        UsuarioDTO usuarioDTO = UsuarioMapper.INSTANCE.toUsuarioDTO(usuario);
        return ResponseEntity.ok(usuarioDTO);
    }


    @PostMapping("/login")
    @Schema(description = "Iniciar sesión")
    public ResponseEntity<UsuarioDTO> login(
            @RequestBody @Valid UsuarioLoginDTO usuarioLoginDTO
    ) {
        Usuario usuarioSave = usuarioService.login(usuarioLoginDTO);
        UsuarioDTO usuarioDTO = UsuarioMapper.INSTANCE.toUsuarioDTO(usuarioSave);
        return ResponseEntity.ok(usuarioDTO);
    }


    @Autowired
    public void setUsuarioService(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

}
