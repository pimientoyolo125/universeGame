package universeGame.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import universeGame.backend.dto.TipoProductoDTO;
import universeGame.backend.model.TipoProducto;

import java.util.List;

@Mapper
public interface TipoProductoMapper {

        TipoProductoMapper INSTANCE = Mappers.getMapper(TipoProductoMapper.class);

        TipoProductoDTO toTipoProductoDTO(TipoProducto entity);

        TipoProducto toTipoProducto(TipoProductoDTO dto);

        List<TipoProductoDTO> toTipoProductoDTOs(List<TipoProducto> entities);

        List<TipoProducto> toTipoProductos(List<TipoProductoDTO> dtos);
}
