package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "accessories")
@Getter
@Setter
@NoArgsConstructor
public class Accessory extends Product {

  private String accessoryType;
  private Integer fanWidthMM;
}
