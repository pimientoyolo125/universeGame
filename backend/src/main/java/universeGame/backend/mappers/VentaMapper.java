package universeGame.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import universeGame.backend.dto.VentaDTO;
import universeGame.backend.model.Venta;

import java.util.List;

@Mapper
public interface VentaMapper {

        VentaMapper INSTANCE = Mappers.getMapper(VentaMapper.class);

        VentaDTO toVentaDTO(Venta entity);

        Venta toVenta(VentaDTO dto);

        List<VentaDTO> toVentaDTOs(List<Venta> entities);

        List<Venta> toVentas(List<VentaDTO> dtos);
}
