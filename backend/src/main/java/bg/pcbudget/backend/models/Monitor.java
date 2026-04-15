package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "monitors")
@Getter
@Setter
@NoArgsConstructor
public class Monitor extends Product {

  private Double panelSizeInch;
  private String aspectRatio;
  private String resolution;
  private Integer refreshRateHz;
  private Integer responseTimeMs;
  private String panelType;
  private Integer brightnessNits;

  @ManyToMany
  @JoinTable(
    name = "monitor_interfaces",
    joinColumns = @JoinColumn(name = "monitor_id"),
    inverseJoinColumns = @JoinColumn(name = "interface_id")
  )
  private List<ItemInterface> interfaces;
}
