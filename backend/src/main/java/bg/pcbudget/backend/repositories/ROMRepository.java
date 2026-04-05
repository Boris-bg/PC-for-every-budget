package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.ROM;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ROMRepository extends JpaRepository<ROM, Long> {
    @EntityGraph(attributePaths = {"interfaceType"})
    List<ROM> findAll();

    List<ROM> findByStorageType(String storageType);
}
