package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "motherboards")
@Getter @Setter @NoArgsConstructor
public class Motherboard extends Product {

    @ManyToOne
    @JoinColumn(name = "socket_id")
    private Socket socket;

    private String chipset;
    private String supportedRamType;
    private Integer ramSlots;
    private String formFactor;
    private Boolean hasBuiltInWifi;
    private Boolean hasBuiltInBluetooth;
    private String interfaces;
    private String ports;
}
