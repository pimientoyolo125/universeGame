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
import universeGame.backend.dto.UsuarioRegisterDTO;
import universeGame.backend.model.Usuario;
import universeGame.backend.service.interfaces.UsuarioService;

@RestController
@RequestMapping("/usuario")
@Tag(name = "Usuario", description = "Endpoints de usuarios")
public class UsuarioController {

    private UsuarioService usuarioService;

    @PostMapping("/registrar")
    @Schema(description = "Registrar un usuario")
    public ResponseEntity<Usuario> registrar(
            @RequestBody @Valid UsuarioRegisterDTO usuarioRegisterDTO
    ) {
        Usuario usuario = usuarioService.register(usuarioRegisterDTO);
        return ResponseEntity.ok(usuario);
    }

    @Autowired
    public void setUsuarioService(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

}
