package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.Cooler;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoolerRepository extends JpaRepository<Cooler, Long> {

}
