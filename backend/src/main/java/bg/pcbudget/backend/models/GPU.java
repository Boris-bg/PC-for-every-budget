package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "gpus")
@Getter @Setter @NoArgsConstructor
public class GPU extends Product {

    private String chipBrand;
    private String graphicsProcessor;
    private String interfaceType;
    private Integer memorySizeGB;
    private String memoryType;
    private Integer slotWidth;
    private String directXVersion;
}
