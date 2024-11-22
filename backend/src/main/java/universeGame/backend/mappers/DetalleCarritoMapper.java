package universeGame.backend.mappers;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import universeGame.backend.dto.DetalleCarritoDTO;
import universeGame.backend.model.DetalleCarrito;

import java.util.List;

@Mapper
public interface DetalleCarritoMapper {

    DetalleCarritoMapper INSTANCE = Mappers.getMapper(DetalleCarritoMapper.class);

    @InheritInverseConfiguration
    DetalleCarrito toDetalleCarrito(DetalleCarritoDTO dto);

    @Mapping(target = "idCarrito", source = "carrito.id")
    DetalleCarritoDTO toDetalleCarritoDTO(DetalleCarrito entity);

    List<DetalleCarritoDTO> toDetalleCarritoDTOs(List<DetalleCarrito> entities);

    List<DetalleCarrito> toDetalleCarritos(List<DetalleCarritoDTO> dtos);
}
