package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.ItemInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NetworkInterfaceRepository extends JpaRepository<ItemInterface, Long> {

}
