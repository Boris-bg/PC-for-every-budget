package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pcs")
@Getter
@Setter
@NoArgsConstructor
public class PC extends Product {

  @ManyToOne(optional = false)
  @JoinColumn(name = "cpu_id")
  private CPU cpu;

  @ManyToOne(optional = false)
  @JoinColumn(name = "cooler_id")
  private Cooler cooler;

  @ManyToOne(optional = false)
  @JoinColumn(name = "motherboard_id")
  private Motherboard motherboard;

  @ManyToOne(optional = false)
  @JoinColumn(name = "ram_id")
  private RAM ram;

  @ManyToOne(optional = false)
  @JoinColumn(name = "rom_id")
  private ROM rom;

  @ManyToOne
  @JoinColumn(name = "rom2_id")
  private ROM rom2;

  @ManyToOne
  @JoinColumn(name = "gpu_id")
  private GPU gpu;

  @ManyToOne(optional = false)
  @JoinColumn(name = "psu_id")
  private PSU psu;

  @ManyToOne
  @JoinColumn(name = "os_id")
  private OS os;

  @ManyToOne(optional = false)
  @JoinColumn(name = "box_id")
  private Box box;

  @ManyToOne
  @JoinColumn(name = "accessory1_id")
  private Accessory accessory1;

  @ManyToOne
  @JoinColumn(name = "accessory2_id")
  private Accessory accessory2;

  private String comment;
}
