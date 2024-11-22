package universeGame.backend.controller;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import universeGame.backend.dto.ProductoDTO;
import universeGame.backend.mappers.ProductoMapper;
import universeGame.backend.model.Producto;
import universeGame.backend.service.interfaces.ProductoService;

import java.util.List;

@RestController
@RequestMapping("/producto")
@Tag(name = "Producto", description = "Endpoints de productos")
public class ProductoController {

    private ProductoService productoService;

    @GetMapping(value = "/id/{id}")
    @Schema(description = "Obtener un producto por su id")
    public ResponseEntity<ProductoDTO> getProductoById(
            @PathVariable("id")
            Long id){
        Producto producto = productoService.getById(id);
        ProductoDTO productoDTO = ProductoMapper.INSTANCE.toProductoDTO(producto);
        return ResponseEntity.ok(productoDTO);
    }

    @GetMapping("/listar")
    @Schema(description = "Listar todos los productos")
    public ResponseEntity<List<ProductoDTO>> listarProductos(){
        List<Producto> productos = productoService.listarProductos();
        List<ProductoDTO> productoDTOs = ProductoMapper.INSTANCE.toProductoDTOs(productos);
        return ResponseEntity.ok(productoDTOs);
    }

    @GetMapping("/listar/marcas")
    @Schema(description = "Listar todas las marcas de los productos")
    public ResponseEntity<List<String>> listarMarcas(){
        List<String> marcas = productoService.listarMarcas();
        return ResponseEntity.ok(marcas);
    }

    @PostMapping("/listar/filtro")
    @Schema(description = "Listar productos filtrados por nombre, marcas, tipo, ordenar por modelo")
    public ResponseEntity<List<ProductoDTO>> listarProductosFiltrados(
            @RequestParam(value = "nombre", required = false, defaultValue = "")
            String nombre,

            @RequestParam(value = "idTipo", required = false)
            Long idTipo,

            @RequestParam(value = "ascendenteModelo", required = false, defaultValue = "false")
            boolean ascendenteModelo,

            @RequestBody(required = false)
            @Schema(description = "Lista de marcas a filtrar",
                    example = "[\"marca1\", \"marca2\"]")
            List<String> marcas
            ){

        List<Producto> productos = productoService.listarProductosFiltrados(nombre, marcas, idTipo, ascendenteModelo);
        List<ProductoDTO> productoDTOs = ProductoMapper.INSTANCE.toProductoDTOs(productos);
        return ResponseEntity.ok(productoDTOs);
    }

    @Autowired
    public void setProductoService(ProductoService productoService){
        this.productoService = productoService;
    }
}
