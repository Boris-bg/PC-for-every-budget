package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.CPU;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CPURepository extends JpaRepository<CPU, Long> {
    java.util.List<CPU> findBySocket_Name(String socketName);
    java.util.List<CPU> findByCoresGreaterThanEqual(Integer cores);
}
