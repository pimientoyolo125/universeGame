package universeGame.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
public class DireccionDTO {

    @NotNull
    private String pais;

    @NotNull
    private String region;

    @NotNull
    private String ciudad;

    @NotNull
    private String direccion;
}
