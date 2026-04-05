package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.Monitor;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MonitorRepository extends JpaRepository<Monitor, Long> {
    @EntityGraph(attributePaths = {"interfaces"})
    List<Monitor> findAll();
}
