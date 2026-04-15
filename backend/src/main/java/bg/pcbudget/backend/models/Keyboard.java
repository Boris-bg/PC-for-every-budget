package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "keyboards")
@Getter
@Setter
@NoArgsConstructor
public class Keyboard extends Product {

  @ManyToOne
  @JoinColumn(name = "interface_id")
  private ItemInterface interfaceType;

  private String connectionType;
  private Boolean hasBulgarianLayout;
  private String keyboardType;
  private String color;
  private String switches;
  private Boolean hasLighting;
}
