package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.Keyboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KeyboardRepository extends JpaRepository<Keyboard, Long> {

}
