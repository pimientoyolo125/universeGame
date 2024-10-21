package universeGame.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import universeGame.backend.dto.UsuarioLoginDTO;
import universeGame.backend.dto.UsuarioRegisterDTO;
import universeGame.backend.exception.CustomException;
import universeGame.backend.mappers.UsuarioMapper;
import universeGame.backend.model.Carrito;
import universeGame.backend.model.TipoUsuario;
import universeGame.backend.model.Usuario;
import universeGame.backend.repository.CarritoRepository;
import universeGame.backend.repository.TipoUsuarioRepository;
import universeGame.backend.repository.UsuarioRepository;
import universeGame.backend.service.interfaces.UsuarioService;

import java.util.regex.Pattern;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private UsuarioRepository usuarioRepository;
    private PasswordEncoder passwordEncoder;
    private TipoUsuarioRepository tipoUsuarioRepository;
    private CarritoRepository carritoRepository;


    private static final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    private static final String PHONE_REGEX = "^[+\\d\\s().-]*$";

    @Override
    @Transactional
    public Usuario register(UsuarioRegisterDTO usuarioRegisterDTO) {
        Usuario usuario = UsuarioMapper.INSTANCE.toUsuarioRegister(usuarioRegisterDTO);

        usuario.setCorreo(usuario.getCorreo().trim().toLowerCase());
        validCorreo(usuario);

        validContrasena(usuario, usuarioRegisterDTO);
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));

        cleanUsuario(usuario);

        TipoUsuario tipoUsuario = tipoUsuarioRepository.findById(1L)
                .orElseThrow(
                        () -> new CustomException("User type not found")
                );

        usuario.setTipoUsuario(tipoUsuario);

        Usuario usuarioSave =  usuarioRepository.save(usuario);

        Carrito carrito = new Carrito();
        carrito.setUsuario(usuarioSave);
        carrito.setTotal(0.0);
        carritoRepository.save(carrito);

        return usuarioSave;
    }


    @Override
    @Transactional
    public Usuario login(UsuarioLoginDTO usuarioLoginDTO) {

        usuarioLoginDTO.setCorreo(usuarioLoginDTO.getCorreo().trim().toLowerCase());

        Usuario usuarioBD = usuarioRepository.findByCorreoIgnoreCase(usuarioLoginDTO.getCorreo())
                .orElseThrow(
                        () -> new CustomException("The email is not registered")
                );

        if(!passwordEncoder.matches(usuarioLoginDTO.getContrasena(), usuarioBD.getContrasena())) {
            throw new CustomException("The password is incorrect");
        }

        return usuarioBD;
    }

    @Override
    public Usuario findByCorreo(String correo) {

        correo = correo.trim().toLowerCase();

        return usuarioRepository.findByCorreoIgnoreCase(correo)
                .orElseThrow(
                        () -> new CustomException("User not found")
                );
    }


    //--------validation ---------------------

    private void validCorreo(Usuario usuario) {

        if(!Pattern.matches(EMAIL_REGEX, usuario.getCorreo())) {
            throw new CustomException("The email is not valid");
        }

        if(usuarioRepository.existsByCorreo(usuario.getCorreo())) {
            throw new CustomException("Already exists an account with this email");
        }
    }

    private void validContrasena(Usuario usuario, UsuarioRegisterDTO usuarioRegisterDTO) {
        if(usuario.getContrasena().length() < 8) {
            throw new CustomException("Password must be at least 8 characters");
        }

        if(usuario.getContrasena().length() > 20) {
            throw new CustomException("Password must be less than 20 characters");
        }

        if(!usuario.getContrasena().equals(usuarioRegisterDTO.getConfirmarContrasena())) {
            throw new CustomException("The passwords don't match");
        }
    }

    private void cleanUsuario(Usuario usuario) {
        usuario.setNombre(usuario.getNombre().trim().toUpperCase().replaceAll("\\s+", " "));
        usuario.setApellido(usuario.getApellido().trim().toUpperCase().replaceAll("\\s+", " "));
        usuario.setTelefono(usuario.getTelefono().trim().replaceAll("\\s+", " "));

        if(!Pattern.matches(PHONE_REGEX, usuario.getTelefono())) {
            throw new CustomException("The phone number is not valid");
        }

        if (usuario.getNombre().length() < 3) {
            throw new CustomException("The name must have more than 3 characters");
        }

        if (usuario.getApellido().length() < 3) {
            throw new CustomException("The last name must have more than 3 characters");
        }

        if (usuario.getTelefono().length() < 5) {
            throw new CustomException("The phone number must have more than 5 characters");
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

    @Autowired
    public void setCarritoRepository(CarritoRepository carritoRepository) {
        this.carritoRepository = carritoRepository;
    }
}
