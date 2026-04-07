package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.PC;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PCRepository extends JpaRepository<PC, Long> {

  @EntityGraph(attributePaths = {
    "cpu", "cpu.socket",
    "cooler",
    "motherboard",
    "ram",
    "rom",
    "rom2",
    "gpu",
    "psu",
    "os",
    "box"
  })
  List<PC> findAll();

  List<PC> findByPriceLessThanEqual(Double maxPrice);
}
