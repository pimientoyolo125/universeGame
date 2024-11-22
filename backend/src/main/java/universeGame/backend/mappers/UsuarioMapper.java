package universeGame.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import universeGame.backend.dto.UsuarioDTO;
import universeGame.backend.dto.UsuarioLoginDTO;
import universeGame.backend.dto.UsuarioRegisterDTO;
import universeGame.backend.model.Usuario;

import java.util.List;

@Mapper
public interface UsuarioMapper {

    UsuarioMapper INSTANCE = Mappers.getMapper(UsuarioMapper.class);

    UsuarioDTO toUsuarioDTO(Usuario entity);

    Usuario toUsuario(UsuarioDTO dto);

    List<UsuarioDTO> toUsuarioDTOs(List<Usuario> entities);

    List<Usuario> toUsuarios(List<UsuarioDTO> dtos);

    Usuario toUsuarioRegister(UsuarioRegisterDTO dto);

    Usuario toUsuarioLogin(UsuarioLoginDTO dto);
}
