package universeGame.backend.controller;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import universeGame.backend.config.TokenUtil;
import universeGame.backend.dto.LoginResponseDTO;
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
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody @Valid UsuarioLoginDTO usuarioLoginDTO
    ) {
        Usuario usuarioSave = usuarioService.login(usuarioLoginDTO);
        String token = TokenUtil.createToken(
                usuarioSave.getNombre(),
                usuarioSave.getCorreo(),
                usuarioSave.getTipoUsuario().getId());

        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        loginResponseDTO.setToken(token);
        loginResponseDTO.setMessage("Successful login");

        return ResponseEntity.ok(loginResponseDTO);
    }

    @GetMapping("/validToken")
    @Schema(description = "Validar token, retorna true si el token es válido, 401 de codigo http si no es asi")
    public ResponseEntity<Boolean> validarToken(
            @RequestHeader("Authorization") String token
    ) {
        return ResponseEntity.ok(true);
    }



    @Autowired
    public void setUsuarioService(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

}
