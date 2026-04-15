package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cpus")
@Getter
@Setter
@NoArgsConstructor
public class CPU extends Product {

  @ManyToOne
  @JoinColumn(name = "socket_id")
  private Socket socket;

  private String model;
  private Double frequencyGHz;
  private Integer cores;
  private Integer threads;
  private String integratedGraphicsModel;
  private Integer tdpWatts;
}
