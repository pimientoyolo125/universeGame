package universeGame.backend.service.impl;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import universeGame.backend.exception.CustomException;
import universeGame.backend.model.Direccion;
import universeGame.backend.model.Usuario;
import universeGame.backend.repository.DireccionRepository;
import universeGame.backend.service.interfaces.DireccionService;
import universeGame.backend.service.interfaces.UsuarioService;

import java.util.Optional;

@Service
public class DireccionServiceImpl implements DireccionService {

    private DireccionRepository direccionRepository;
    private UsuarioService usuarioService;

    @Override
    public Direccion getByCorreoUsuario(String correoUsuario) {

        Usuario usuario = usuarioService.findByCorreo(correoUsuario);

        return direccionRepository.findByUsuarioId(usuario.getId())
                .orElseThrow(() -> new CustomException("User adress not found"));

    }

    @Override
    @Transactional
    public Direccion save(String correoUsuario, Direccion direccion) {

        direccion.setId(null);

        Usuario usuario = usuarioService.findByCorreo(correoUsuario);

        direccion.setUsuario(usuario);

        if(direccionRepository.existsByUsuarioId(usuario.getId())){
            throw new CustomException("User already has an address");
        }

        validString(direccion);

        return direccionRepository.save(direccion);
    }

    @Override
    @Transactional
    public Direccion update(String correoUsuario, Direccion direccion) {

        Usuario usuario = usuarioService.findByCorreo(correoUsuario);

        Optional<Direccion> direccionDBOptional = direccionRepository.findByUsuarioId(usuario.getId());

        if (direccionDBOptional.isEmpty()){
            direccion.setId(null);
        }else{
            Direccion direccionDB = direccionDBOptional.get();
            direccion.setId(direccionDB.getId());
        }

        direccion.setUsuario(usuario);

        validString(direccion);

        return direccionRepository.save(direccion);
    }


    private void validString(Direccion direccion){

        direccion.setPais(direccion.getPais().trim().toUpperCase());
        direccion.setRegion(direccion.getRegion().trim().toUpperCase());
        direccion.setCiudad(direccion.getCiudad().trim().toUpperCase());
        direccion.setDireccion(direccion.getDireccion().trim().toUpperCase());

        if (direccion.getPais().trim().isEmpty() || direccion.getPais().length() > 100){
            throw new CustomException("Invalid country");
        }

        if (direccion.getRegion().trim().isEmpty() || direccion.getRegion().length() > 100){
            throw new CustomException("Invalid state");
        }

        if (direccion.getCiudad().trim().isEmpty() || direccion.getCiudad().length() > 100){
            throw new CustomException("Invalid city");
        }

        if (direccion.getDireccion().trim().isEmpty() || direccion.getDireccion().length() > 250){
            throw new CustomException("Invalid address");
        }
    }



    //------- setter ---------------
    @Autowired
    public void setDireccionRepository(DireccionRepository direccionRepository) {
        this.direccionRepository = direccionRepository;
    }

    @Autowired
    public void setUsuarioService(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }
}

