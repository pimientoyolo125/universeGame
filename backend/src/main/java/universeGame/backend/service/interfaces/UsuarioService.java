package universeGame.backend.service.interfaces;

import universeGame.backend.dto.UsuarioLoginDTO;
import universeGame.backend.dto.UsuarioRegisterDTO;
import universeGame.backend.model.Usuario;

public interface UsuarioService {

    Usuario register(UsuarioRegisterDTO usuarioRegisterDTO);

    Usuario login(UsuarioLoginDTO usuarioLoginDTO);

    Usuario findByCorreo(String correo);
}
