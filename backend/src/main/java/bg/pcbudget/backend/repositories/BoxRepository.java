package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.Box;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BoxRepository extends JpaRepository<Box, Long> {
  List<Box> findByBoxFormFactor(String boxFormFactor);
  List<Box> findByMotherboardFormFactor(String motherboardFormFactor);
  List<Box> findByColor(String color);
}
