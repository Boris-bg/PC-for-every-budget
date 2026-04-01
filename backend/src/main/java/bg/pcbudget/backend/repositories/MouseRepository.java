package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.Mouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MouseRepository extends JpaRepository<Mouse, Long> {

}
