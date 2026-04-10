package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.Order;
import bg.pcbudget.backend.models.OrderItem;
import bg.pcbudget.backend.repositories.OrderRepository;
import bg.pcbudget.backend.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class OrderService {

  private final OrderRepository repository;
  private final ProductRepository productRepository;

  public List<Order> getAll() { return repository.findAll(); }
  public List<Order> getByUserId(Long userId) { return repository.findByUser_Id(userId); }
  public Optional<Order> getById(Long id) { return repository.findById(id); }

  public Order save(Order order) {
    if (order.getItems() != null) {
      for (OrderItem item : order.getItems()) {
        item.setOrder(order);
        productRepository.findById(item.getProduct().getId())
          .ifPresent(p -> {
            item.setPriceAtPurchase(p.getPrice());
            int newAvailability = p.getAvailability() - item.getQuantity();
            p.setAvailability(Math.max(0, newAvailability));
            productRepository.save(p);
          });
      }
      double total = order.getItems().stream()
        .mapToDouble(i -> i.getPriceAtPurchase() * i.getQuantity())
        .sum();
      order.setTotal(total);
    }
    return repository.save(order);
  }

  public Order updateStatus(Long id, Order.Status status) {
    Order order = repository.findById(id)
      .orElseThrow(() -> new RuntimeException("Order not found: " + id));
    order.setStatus(status);
    return repository.save(order);
  }

  public void delete(Long id) { repository.deleteById(id); }
}
