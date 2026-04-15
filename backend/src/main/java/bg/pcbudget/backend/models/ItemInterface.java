package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "interfaces")
@Getter
@Setter
@NoArgsConstructor
public class ItemInterface {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String name;

  private String category;
}
