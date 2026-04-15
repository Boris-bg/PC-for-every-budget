package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "peripheral_accessories")
@Getter
@Setter
@NoArgsConstructor
public class PeripheralAccessory extends Product {

  private String accessoryType;
}
