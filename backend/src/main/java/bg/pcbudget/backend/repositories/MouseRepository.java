package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.Mouse;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MouseRepository extends JpaRepository<Mouse, Long> {
    @EntityGraph(attributePaths = {"interfaceType"})
    List<Mouse> findAll();
}
