package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.OS;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OSRepository extends JpaRepository<OS, Long> {

}
