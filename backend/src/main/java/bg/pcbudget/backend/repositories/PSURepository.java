package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.PSU;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PSURepository extends JpaRepository<PSU, Long> {
    java.util.List<PSU> findByPowerWattsGreaterThanEqual(Integer watts);
}
