package universeGame.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import universeGame.backend.dto.DireccionDTO;
import universeGame.backend.model.Direccion;

import java.util.List;

@Mapper
public interface DireccionMapper {

        DireccionMapper INSTANCE = Mappers.getMapper(DireccionMapper.class);

        DireccionDTO toDireccionDTO(Direccion entity);

        Direccion toDireccion(DireccionDTO dto);

        List<DireccionDTO> toDireccionDTOs(List<Direccion> entities);

        List<Direccion> toDirecciones(List<DireccionDTO> dtos);
}
