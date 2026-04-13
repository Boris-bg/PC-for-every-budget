package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
  Optional<Service> findByNameIgnoreCase(String name);
}
