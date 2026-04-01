package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.NetworkInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NetworkInterfaceRepository extends JpaRepository<NetworkInterface, Long> {

}
