package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.Motherboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MotherboardRepository extends JpaRepository<Motherboard, Long> {

}
