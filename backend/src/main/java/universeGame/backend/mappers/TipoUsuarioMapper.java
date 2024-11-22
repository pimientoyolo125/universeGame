package universeGame.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import universeGame.backend.dto.TipoUsuarioDTO;
import universeGame.backend.model.TipoUsuario;

import java.util.List;

@Mapper
public interface TipoUsuarioMapper {

    TipoUsuarioMapper INSTANCE = Mappers.getMapper(TipoUsuarioMapper.class);

    TipoUsuarioDTO toTipoUsuarioDTO(TipoUsuario entity);

    TipoUsuario toTipoUsuario(TipoUsuarioDTO dto);

    List<TipoUsuarioDTO> toTipoUsuarioDTOs(List<TipoUsuario> entities);

    List<TipoUsuario> toTipoUsuarios(List<TipoUsuarioDTO> dtos);
}
