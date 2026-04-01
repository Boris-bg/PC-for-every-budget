package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    java.util.List<Order> findByUser_Id(Long userId);
    java.util.List<Order> findByStatus(Order.Status status);
}
