package universeGame.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import universeGame.backend.dto.DetalleVentaDTO;
import universeGame.backend.model.DetalleVenta;

import java.util.List;

@Mapper
public interface DetalleCarritoMapper {

    DetalleVentaMapper INSTANCE = Mappers.getMapper(DetalleVentaMapper.class);

    DetalleVenta toDetalleVenta(DetalleVentaDTO dto);

    DetalleVentaDTO toDetalleVentaDTO(DetalleVenta entity);

    List<DetalleVentaDTO> toDetalleVentaDTOs(List<DetalleVenta> entities);

    List<DetalleVenta> toDetalleVenta(List<DetalleVentaDTO> dtos);
}
