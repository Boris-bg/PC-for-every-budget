package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "coolers")
@Getter @Setter @NoArgsConstructor
public class Cooler extends Product {

    private String coolingType;

    @ManyToOne
    @JoinColumn(name = "socket_id")
    private Socket socket;

    private Integer fanWidthMM;
}
