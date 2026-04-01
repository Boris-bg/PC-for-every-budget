package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.ROM;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ROMRepository extends JpaRepository<ROM, Long> {
    java.util.List<ROM> findByStorageType(String storageType);
}
