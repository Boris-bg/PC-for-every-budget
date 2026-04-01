package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.PC;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PCRepository extends JpaRepository<PC, Long> {
    java.util.List<PC> findByPriceLessThanEqual(Double maxPrice);
}
