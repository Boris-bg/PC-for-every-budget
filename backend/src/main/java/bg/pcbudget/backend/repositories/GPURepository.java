package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.GPU;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GPURepository extends JpaRepository<GPU, Long> {
    java.util.List<GPU> findByChipBrand(String chipBrand);
    java.util.List<GPU> findByMemoryType(String memoryType);
}
