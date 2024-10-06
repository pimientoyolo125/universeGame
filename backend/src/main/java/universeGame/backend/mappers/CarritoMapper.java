package universeGame.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import universeGame.backend.dto.CarritoDTO;
import universeGame.backend.model.Carrito;

import java.util.List;

@Mapper
public interface CarritoMapper {

        CarritoMapper INSTANCE = Mappers.getMapper(CarritoMapper.class);

        Carrito toCarrito(CarritoDTO dto);

        CarritoDTO toCarritoDTO(Carrito entity);

        List<CarritoDTO> toCarritoDTOs(List<Carrito> entities);

        List<Carrito> toCarritos(List<CarritoDTO> dtos);
}
