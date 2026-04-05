package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "roms")
@Getter @Setter @NoArgsConstructor
public class ROM extends Product {

    private String storageType;
    private Integer memorySizeGB;
    private String formFactor;

    @ManyToOne
    @JoinColumn(name = "interface_id")
    private ItemInterface interfaceType;
  }
