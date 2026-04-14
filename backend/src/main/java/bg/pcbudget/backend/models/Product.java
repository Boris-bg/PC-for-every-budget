package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "products")
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@NoArgsConstructor
public abstract class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private Double price;

  private String brand;
  private Integer warrantyPeriod;
  private Integer availability;
  private String additionalDetails;

  @Column(columnDefinition = "double precision default 5.0")
  private Double rating = 5.0;
  @Column(nullable = false, columnDefinition = "integer default 0")
  private Integer ratingCount = 0;

  private String imageUrl;
  private String imageAltText;
}
