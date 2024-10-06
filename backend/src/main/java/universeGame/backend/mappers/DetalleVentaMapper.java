package universeGame.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import universeGame.backend.dto.DetalleVentaDTO;
import universeGame.backend.model.DetalleVenta;

import java.util.List;

@Mapper
public interface DetalleVentaMapper {

        DetalleVentaMapper INSTANCE = Mappers.getMapper(DetalleVentaMapper.class);

        DetalleVentaDTO toDetalleVentaDTO(DetalleVenta entity);

        DetalleVenta toDetalleVenta(DetalleVentaDTO dto);

        List<DetalleVentaDTO> toDetalleVentaDTOs(List<DetalleVenta> entities);

        List<DetalleVenta> toDetalleVentas(List<DetalleVentaDTO> dtos);
}
