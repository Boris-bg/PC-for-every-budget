package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.Order;
import bg.pcbudget.backend.models.OrderItem;
import bg.pcbudget.backend.models.PC;
import bg.pcbudget.backend.models.Product;
import bg.pcbudget.backend.repositories.OrderRepository;
import bg.pcbudget.backend.repositories.PCRepository;
import bg.pcbudget.backend.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class OrderService {

  private final OrderRepository   repository;
  private final ProductRepository productRepository;
  private final PCRepository      pcRepository;

  public List<Order> getAll() { return repository.findAllByOrderByIdDesc(); }
  public List<Order> getByUserId(Long userId) { return repository.findByUser_IdOrderByIdDesc(userId); }
  public Optional<Order> getById(Long id) { return repository.findById(id); }

  public Order save(Order order) {
    if (order.getItems() != null) {
      for (OrderItem item : order.getItems()) {
        item.setOrder(order);
        productRepository.findById(item.getProduct().getId())
          .ifPresent(p -> {
            item.setPriceAtPurchase(p.getPrice());
            decreaseAvailability(p, item.getQuantity());
            // Ако е PC — намали и компонентите
            pcRepository.findById(p.getId())
              .ifPresent(pc -> decreasePcComponents(pc, item.getQuantity()));
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

    if (order.getStatus() == Order.Status.CANCELLED ||
      order.getStatus() == Order.Status.DELIVERED) {
      throw new RuntimeException("Cannot change status of a completed or cancelled order");
    }

    if (status == Order.Status.CANCELLED && order.getItems() != null) {
      for (OrderItem item : order.getItems()) {
        productRepository.findById(item.getProduct().getId())
          .ifPresent(p -> {
            increaseAvailability(p, item.getQuantity());
            // Ако е PC — върни и компонентите
            pcRepository.findById(p.getId())
              .ifPresent(pc -> increasePcComponents(pc, item.getQuantity()));
          });
      }
    }

    order.setStatus(status);
    return repository.save(order);
  }

  public void delete(Long id) { repository.deleteById(id); }

  // ── Helpers ──────────────────────────────────────────────

  private void decreaseAvailability(Product p, int qty) {
    p.setAvailability(Math.max(0, p.getAvailability() - qty));
    productRepository.save(p);
  }

  private void increaseAvailability(Product p, int qty) {
    p.setAvailability(p.getAvailability() + qty);
    productRepository.save(p);
  }

  private void decreasePcComponents(PC pc, int qty) {
    for (Product component : getPcComponents(pc)) {
      decreaseAvailability(component, qty);
    }
  }

  private void increasePcComponents(PC pc, int qty) {
    for (Product component : getPcComponents(pc)) {
      increaseAvailability(component, qty);
    }
  }

  private List<Product> getPcComponents(PC pc) {
    List<Product> components = new ArrayList<>();
    if (pc.getCpu()         != null) components.add(pc.getCpu());
    if (pc.getCooler()      != null) components.add(pc.getCooler());
    if (pc.getMotherboard() != null) components.add(pc.getMotherboard());
    if (pc.getRam()         != null) components.add(pc.getRam());
    if (pc.getRom()         != null) components.add(pc.getRom());
    if (pc.getRom2()        != null) components.add(pc.getRom2());
    if (pc.getGpu()         != null) components.add(pc.getGpu());
    if (pc.getPsu()         != null) components.add(pc.getPsu());
    if (pc.getOs()          != null) components.add(pc.getOs());
    if (pc.getBox()         != null) components.add(pc.getBox());
    if (pc.getAccessory1()  != null) components.add(pc.getAccessory1());
    if (pc.getAccessory2()  != null) components.add(pc.getAccessory2());
    return components;
  }
}
