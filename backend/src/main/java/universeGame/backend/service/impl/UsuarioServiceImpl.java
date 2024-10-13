package universeGame.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import universeGame.backend.dto.UsuarioLoginDTO;
import universeGame.backend.dto.UsuarioRegisterDTO;
import universeGame.backend.exception.CustomException;
import universeGame.backend.mappers.UsuarioMapper;
import universeGame.backend.model.TipoUsuario;
import universeGame.backend.model.Usuario;
import universeGame.backend.repository.TipoUsuarioRepository;
import universeGame.backend.repository.UsuarioRepository;
import universeGame.backend.service.interfaces.UsuarioService;

import java.util.regex.Pattern;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private UsuarioRepository usuarioRepository;
    private PasswordEncoder passwordEncoder;
    private TipoUsuarioRepository tipoUsuarioRepository;


    private static final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    private static final String PHONE_REGEX = "^[+\\d\\s().-]*$";

    @Override
    public Usuario register(UsuarioRegisterDTO usuarioRegisterDTO) {
        Usuario usuario = UsuarioMapper.INSTANCE.toUsuarioRegister(usuarioRegisterDTO);

        usuario.setCorreo(usuario.getCorreo().trim().toLowerCase());
        validCorreo(usuario);

        validContrasena(usuario, usuarioRegisterDTO);
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));

        cleanUsuario(usuario);

        TipoUsuario tipoUsuario = tipoUsuarioRepository.findById(1L)
                .orElseThrow(
                        () -> new CustomException("Error con el tipo de usuario")
                );

        usuario.setTipoUsuario(tipoUsuario);

        return usuarioRepository.save(usuario);
    }


    @Override
    public Usuario login(UsuarioLoginDTO usuarioLoginDTO) {

        usuarioLoginDTO.setCorreo(usuarioLoginDTO.getCorreo().trim().toLowerCase());

        Usuario usuarioBD = usuarioRepository.findByCorreoIgnoreCase(usuarioLoginDTO.getCorreo())
                .orElseThrow(
                        () -> new CustomException("El correo no está registrado")
                );

        if(!passwordEncoder.matches(usuarioLoginDTO.getContrasena(), usuarioBD.getContrasena())) {
            throw new CustomException("La contraseña es incorrecta");
        }

        return usuarioBD;
    }


    //--------validation ---------------------

    private void validCorreo(Usuario usuario) {

        if(!Pattern.matches(EMAIL_REGEX, usuario.getCorreo())) {
            throw new CustomException("El correo no es válido");
        }

        if(usuarioRepository.existsByCorreo(usuario.getCorreo())) {
            throw new CustomException("El correo ya está en uso");
        }
    }

    private void validContrasena(Usuario usuario, UsuarioRegisterDTO usuarioRegisterDTO) {
        if(usuario.getContrasena().length() < 8) {
            throw new CustomException("La contraseña debe tener al menos 8 caracteres");
        }

        if(usuario.getContrasena().length() > 20) {
            throw new CustomException("La contraseña debe tener como máximo 20 caracteres");
        }

        if(!usuario.getContrasena().equals(usuarioRegisterDTO.getConfirmarContrasena())) {
            throw new CustomException("Las contraseñas no coinciden");
        }
    }

    private void cleanUsuario(Usuario usuario) {
        usuario.setNombre(usuario.getNombre().trim().toUpperCase().replaceAll("\\s+", " "));
        usuario.setApellido(usuario.getApellido().trim().toUpperCase().replaceAll("\\s+", " "));
        usuario.setTelefono(usuario.getTelefono().trim().replaceAll("\\s+", " "));

        if(!Pattern.matches(PHONE_REGEX, usuario.getTelefono())) {
            throw new CustomException("El teléfono no es válido");
        }

        if (usuario.getNombre().length() <= 3) {
            throw new CustomException("El nombre debe tener mas de 3 caracteres");
        }

        if (usuario.getApellido().length() <= 3) {
            throw new CustomException("El apellido debe tener mas de 3 caracteres");
        }

        if (usuario.getTelefono().length() <= 6) {
            throw new CustomException("El teléfono debe tener mas de 6 caracteres");
        }
    }





    //--------------- setter --------------------
    @Autowired
    public void setUsuarioRepository(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Autowired
    public void setTipoUsuarioRepository(TipoUsuarioRepository tipoUsuarioRepository) {
        this.tipoUsuarioRepository = tipoUsuarioRepository;
    }
}
