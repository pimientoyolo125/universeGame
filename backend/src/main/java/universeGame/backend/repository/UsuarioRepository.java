package universeGame.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import universeGame.backend.model.Usuario;

@Repository
public interface UsuarioRepository  extends JpaRepository<Usuario, Long> {

    boolean existsByCorreo(String correo);
}
