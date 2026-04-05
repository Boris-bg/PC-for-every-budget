package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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

    @ManyToMany
    @JoinTable(
      name = "motherboard_interfaces",
      joinColumns        = @JoinColumn(name = "motherboard_id"),
      inverseJoinColumns = @JoinColumn(name = "interface_id")
    )
    private List<ItemInterface> interfaces;

    private String ports;
}
