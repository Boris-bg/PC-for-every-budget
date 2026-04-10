package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
  List<Order> findByUser_IdOrderByIdDesc(Long userId);
  List<Order> findAllByOrderByIdDesc();
  List<Order> findByStatus(Order.Status status);
}
