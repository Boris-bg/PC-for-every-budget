package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
  List<Product> findByNameContainingIgnoreCase(String name);

  List<Product> findByBrand(String brand);

  List<Product> findByPriceBetween(Double min, Double max);

  Optional<Product> findByName(String name);

  @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :query, '%'))")
  List<Product> searchByNameOrBrand(@Param("query") String query);

  @Query(value = """
    SELECT p.id, p.name, p.price, p.brand, p.availability, p.rating,
           p.image_url, p.image_alt_text, p.additional_details, p.warranty_period,
           p.rating_count,
           CASE
             WHEN c.id   IS NOT NULL THEN 'CPU'
             WHEN g.id   IS NOT NULL THEN 'GPU'
             WHEN r.id   IS NOT NULL THEN 'RAM'
             WHEN ro.id  IS NOT NULL THEN 'ROM'
             WHEN m.id   IS NOT NULL THEN 'Motherboard'
             WHEN co.id  IS NOT NULL THEN 'Cooler'
             WHEN ps.id  IS NOT NULL THEN 'PSU'
             WHEN b.id   IS NOT NULL THEN 'Box'
             WHEN o.id   IS NOT NULL THEN 'OS'
             WHEN a.id   IS NOT NULL THEN 'Accessory'
             WHEN pa.id  IS NOT NULL THEN 'Peripheral'
             WHEN k.id   IS NOT NULL THEN 'Keyboard'
             WHEN mo.id  IS NOT NULL THEN 'Mouse'
             WHEN mn.id  IS NOT NULL THEN 'Monitor'
             WHEN pc.id  IS NOT NULL THEN 'PC'
             ELSE 'Unknown'
           END AS category
    FROM products p
    LEFT JOIN cpus                   c   ON c.id   = p.id
    LEFT JOIN gpus                   g   ON g.id   = p.id
    LEFT JOIN rams                   r   ON r.id   = p.id
    LEFT JOIN roms                   ro  ON ro.id  = p.id
    LEFT JOIN motherboards           m   ON m.id   = p.id
    LEFT JOIN coolers                co  ON co.id  = p.id
    LEFT JOIN psus                   ps  ON ps.id  = p.id
    LEFT JOIN boxes                  b   ON b.id   = p.id
    LEFT JOIN operating_systems      o   ON o.id   = p.id
    LEFT JOIN accessories            a   ON a.id   = p.id
    LEFT JOIN peripheral_accessories pa  ON pa.id  = p.id
    LEFT JOIN keyboards              k   ON k.id   = p.id
    LEFT JOIN mice                   mo  ON mo.id  = p.id
    LEFT JOIN monitors               mn  ON mn.id  = p.id
    LEFT JOIN pcs                    pc  ON pc.id  = p.id
    ORDER BY p.id DESC
    """, nativeQuery = true)
  List<Map<String, Object>> findAllBasicInfo();
}
