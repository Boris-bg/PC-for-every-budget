package bg.pcbudget.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "boxes")
@Getter
@Setter
@NoArgsConstructor
public class Box extends Product {

  private String motherboardFormFactor;
  private String boxFormFactor;
  private String color;
  private Integer maxGPULengthMM;
  private Integer maxCPUCoolerHeightMM;
  private String psuType;
}
