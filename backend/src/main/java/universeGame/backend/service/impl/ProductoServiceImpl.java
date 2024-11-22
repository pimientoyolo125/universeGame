package universeGame.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import universeGame.backend.exception.CustomException;
import universeGame.backend.model.Producto;
import universeGame.backend.repository.ProductoRepository;
import universeGame.backend.service.interfaces.ProductoService;

import java.util.List;

@Service
public class ProductoServiceImpl implements ProductoService {

    private ProductoRepository productoRepository;

    @Override
    public Producto getById(Long id){
        return productoRepository.findById(id).orElseThrow(
                () -> new CustomException("Product not found")
        );
    }

    @Override
    public List<Producto> listarProductos(){
        return productoRepository.findAll();
    }

    @Override
    public List<String> listarMarcas(){
        return productoRepository.findMarcas();
    }

    @Override
    public List<Producto> listarProductosFiltrados(String nombre, List<String> marcas, Long idTipo, boolean ascendenteModelo){

        if(nombre != null) {
            nombre = nombre.toUpperCase().trim();
        }

        if(marcas != null && marcas.isEmpty()){
            marcas = null;
        }

        if(ascendenteModelo){
            return productoRepository.findProductosFiltradosAsc(nombre, marcas, idTipo);
        }
        return productoRepository.findProductosFiltradosDesc(nombre, marcas, idTipo);
    }

    //------setter----------

    @Autowired
    public void setProductoRepository(ProductoRepository productoRepository){
        this.productoRepository = productoRepository;
    }
}
