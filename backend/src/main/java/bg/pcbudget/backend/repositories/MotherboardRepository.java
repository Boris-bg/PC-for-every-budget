package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.Motherboard;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MotherboardRepository extends JpaRepository<Motherboard, Long> {
    @EntityGraph(attributePaths = {"socket", "interfaces"})
    List<Motherboard> findAll();
}
