package universeGame.backend.service.interfaces;

import universeGame.backend.model.Direccion;

public interface DireccionService {

    Direccion getByCorreoUsuario(String correoUsuario);

    Direccion save (String correoUsuario, Direccion direccion);

    Direccion update (String correoUsuario, Direccion direccion);
}
