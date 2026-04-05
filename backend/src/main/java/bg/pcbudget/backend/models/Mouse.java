package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "mice")
@Getter @Setter @NoArgsConstructor
public class Mouse extends Product {

    private String connectionType;
    private Integer maxDpi;

    @ManyToOne
    @JoinColumn(name = "interface_id")
    private ItemInterface interfaceType;

    private String color;
    private Boolean suitableForLeftHand;
}
