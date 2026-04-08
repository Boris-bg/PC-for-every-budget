package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.Order;
import bg.pcbudget.backend.services.OrderService;
import bg.pcbudget.backend.repositories.UserRepository;
import bg.pcbudget.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

  private final OrderService service;
  private final UserRepository userRepository;
  private final JwtUtil jwtUtil;

  // Get MY orders
  @GetMapping("/my")
  public ResponseEntity<?> getMyOrders(@RequestHeader("Authorization") String authHeader) {
    String username = jwtUtil.getUsername(authHeader.substring(7));
    return userRepository.findByUsername(username)
      .map(u -> ResponseEntity.ok(service.getByUserId(u.getId())))
      .orElse(ResponseEntity.status(401).build());
  }

  // Place order
  @PostMapping
  public ResponseEntity<?> create(
    @RequestHeader("Authorization") String authHeader,
    @RequestBody Order order) {
    String username = jwtUtil.getUsername(authHeader.substring(7));
    return userRepository.findByUsername(username)
      .map(u -> {
        order.setUser(u);
        return ResponseEntity.ok(service.save(order));
      })
      .orElse(ResponseEntity.status(401).build());
  }

  // Admin: all orders
  @GetMapping
  public List<Order> getAll() { return service.getAll(); }

  @GetMapping("/{id}")
  public ResponseEntity<Order> getById(@PathVariable Long id) {
    return service.getById(id).map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @PatchMapping("/{id}/status")
  public ResponseEntity<Order> updateStatus(@PathVariable Long id,
                                            @RequestParam Order.Status status) {
    return ResponseEntity.ok(service.updateStatus(id, status));
  }
}
