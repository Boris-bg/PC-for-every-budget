package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.PeripheralAccessory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeripheralAccessoryRepository extends JpaRepository<PeripheralAccessory, Long> {

}
