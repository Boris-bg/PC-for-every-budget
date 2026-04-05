package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.GPU;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GPURepository extends JpaRepository<GPU, Long> {
    @EntityGraph(attributePaths = {"interfaceType"})
    List<GPU> findAll();

    List<GPU> findByChipBrand(String chipBrand);
    List<GPU> findByMemoryType(String memoryType);
}
