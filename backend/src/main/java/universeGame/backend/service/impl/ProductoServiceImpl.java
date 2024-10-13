package universeGame.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import universeGame.backend.model.Producto;
import universeGame.backend.repository.ProductoRepository;
import universeGame.backend.service.interfaces.ProductoService;

import java.util.List;

@Service
public class ProductoServiceImpl implements ProductoService {

    private ProductoRepository productoRepository;

    @Override
    public Producto getById(Long id){
        return productoRepository.findById(id).orElse(null);
    }

    @Override
    public List<Producto> listarProductos(){
        return productoRepository.findAll();
    }

    @Autowired
    public void setProductoRepository(ProductoRepository productoRepository){
        this.productoRepository = productoRepository;
    }
}
