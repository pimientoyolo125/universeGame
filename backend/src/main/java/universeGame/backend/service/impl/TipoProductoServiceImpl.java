package universeGame.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import universeGame.backend.model.TipoProducto;
import universeGame.backend.repository.TipoProductoRepository;
import universeGame.backend.service.interfaces.TipoProductoService;

import java.util.List;

@Service
public class TipoProductoServiceImpl implements TipoProductoService {

    private TipoProductoRepository tipoProductoRepository;

    @Override
    public List<TipoProducto> listar() {
        return tipoProductoRepository.findAll();
    }

    //-----setters-----

    @Autowired
    public void setTipoProductoRepository(TipoProductoRepository tipoProductoRepository) {
        this.tipoProductoRepository = tipoProductoRepository;
    }
}
