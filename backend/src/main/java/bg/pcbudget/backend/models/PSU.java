package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "psus")
@Getter @Setter @NoArgsConstructor
public class PSU extends Product {

    private Integer powerWatts;
    private String formFactor;
    private String efficiency;
    private String category;
    private Boolean hasPfc;
    private String wiringType;
}
