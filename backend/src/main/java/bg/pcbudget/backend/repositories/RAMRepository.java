package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.RAM;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RAMRepository extends JpaRepository<RAM, Long> {
  List<RAM> findByType(String type);
  List<RAM> findByMemorySizeGB(Integer size);
  List<RAM> findByIsRGB(Boolean isRGB);
}
