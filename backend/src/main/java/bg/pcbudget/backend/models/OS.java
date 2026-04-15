package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "operating_systems")
@Getter
@Setter
@NoArgsConstructor
public class OS extends Product {

  private String osType;
}
