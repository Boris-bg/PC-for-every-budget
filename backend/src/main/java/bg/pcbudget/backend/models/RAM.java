package bg.pcbudget.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "rams")
@Getter
@Setter
@NoArgsConstructor
public class RAM extends Product {

  private Integer memorySizeGB;
  private String type;
  private Integer speedMHz;
  private Boolean isKIT;
  private Boolean isRGB;
}
