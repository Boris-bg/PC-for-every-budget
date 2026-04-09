package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.Order;
import bg.pcbudget.backend.models.OrderItem;
import bg.pcbudget.backend.repositories.ProductRepository;
import bg.pcbudget.backend.services.OrderService;
import bg.pcbudget.backend.repositories.UserRepository;
import bg.pcbudget.backend.security.JwtUtil;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

  private final OrderService service;
  private final UserRepository userRepository;
  private final ProductRepository productRepository;
  private final JwtUtil jwtUtil;

  // ── DTOs ────────────────────────────────────────────────
  @Getter @Setter
  static class ProductRef { private Long id; }

  @Getter @Setter
  static class OrderItemDto {
    private ProductRef product;
    private Integer quantity;
    private Double priceAtPurchase;
  }

  @Getter @Setter
  static class OrderDto {
    private List<OrderItemDto> items;
    private String phone;
    private String deliveryAddress;
    private String deliveryType;
    private String paymentMethod;
  }

  // ── Place order ──────────────────────────────────────────
  @PostMapping
  public ResponseEntity<?> create(
    @RequestHeader("Authorization") String authHeader,
    @RequestBody OrderDto dto) {

    String username = jwtUtil.getUsername(authHeader.substring(7));

    return userRepository.findByUsername(username)
      .map(u -> {
        Order order = new Order();
        order.setUser(u);
        order.setPhone(dto.getPhone());
        order.setDeliveryAddress(dto.getDeliveryAddress());
        order.setDeliveryType(dto.getDeliveryType());
        order.setPaymentMethod(dto.getPaymentMethod());

        List<OrderItem> items = dto.getItems().stream()
          .map(itemDto -> {
            OrderItem item = new OrderItem();
            productRepository.findById(itemDto.getProduct().getId())
              .ifPresent(item::setProduct);
            item.setQuantity(itemDto.getQuantity());
            item.setPriceAtPurchase(itemDto.getPriceAtPurchase());
            return item;
          })
          .collect(Collectors.toList());

        order.setItems(items);
        return ResponseEntity.ok(service.save(order));
      })
      .orElse(ResponseEntity.status(401).build());
  }

  // ── Get my orders ────────────────────────────────────────
  @GetMapping("/my")
  public ResponseEntity<?> getMyOrders(@RequestHeader("Authorization") String authHeader) {
    String username = jwtUtil.getUsername(authHeader.substring(7));
    return userRepository.findByUsername(username)
      .map(u -> {
        List<Order> orders = service.getByUserId(u.getId());
        // Map to safe DTO
        List<java.util.Map<String, Object>> result = orders.stream().map(o -> {
          java.util.Map<String, Object> map = new java.util.LinkedHashMap<>();
          map.put("id",              o.getId());
          map.put("total",           o.getTotal());
          map.put("status",          o.getStatus());
          map.put("createdAt",       o.getCreatedAt());
          map.put("phone",           o.getPhone());
          map.put("deliveryAddress", o.getDeliveryAddress());
          map.put("deliveryType",    o.getDeliveryType());
          map.put("paymentMethod",   o.getPaymentMethod());
          map.put("items", o.getItems() == null ? List.of() :
            o.getItems().stream().map(i -> {
              java.util.Map<String, Object> item = new java.util.LinkedHashMap<>();
              item.put("productId",       i.getProduct() != null ? i.getProduct().getId() : null);
              item.put("productName",     i.getProduct() != null ? i.getProduct().getName() : null);
              item.put("quantity",        i.getQuantity());
              item.put("priceAtPurchase", i.getPriceAtPurchase());
              return item;
            }).collect(java.util.stream.Collectors.toList())
          );
          return map;
        }).collect(java.util.stream.Collectors.toList());
        return ResponseEntity.ok(result);
      })
      .orElse(ResponseEntity.status(401).build());
  }

  // ── Admin ─────────────────────────────────────────────────
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
