package universeGame.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import universeGame.backend.dto.ProductoDTO;
import universeGame.backend.model.Producto;

import java.util.List;

@Mapper
public interface ProductoMapper {

        ProductoMapper INSTANCE = Mappers.getMapper(ProductoMapper.class);

        ProductoDTO toProductoDTO(Producto entity);

        Producto toProducto(ProductoDTO dto);

        List<ProductoDTO> toProductoDTOs(List<Producto> entities);

        List<Producto> toProductos(List<ProductoDTO> dtos);
}
