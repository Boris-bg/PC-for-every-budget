package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByBrand(String brand);
    List<Product> findByPriceBetween(Double min, Double max);
    Optional<Product> findByName(String name);

    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Product> searchByNameOrBrand(@Param("query") String query);

    @Query(value = "SELECT id, name, price, brand, availability, rating, image_url, image_alt_text, additional_details, warranty_period FROM products ORDER BY id DESC", nativeQuery = true)
    List<java.util.Map<String, Object>> findAllBasicInfo();
}
