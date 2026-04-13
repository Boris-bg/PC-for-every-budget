package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.Product;
import bg.pcbudget.backend.repositories.ProductRepository;
import bg.pcbudget.backend.repositories.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

  private final ProductRepository repository;

  @GetMapping("/search")
  public List<Product> search(@RequestParam(required = false, defaultValue = "") String q) {
    if (q == null || q.trim().isEmpty())
      return repository.findAll();   // ← всички продукти при празно
    if (q.trim().length() < 2)
      return List.of();
    return repository.searchByNameOrBrand(q.trim());
  }

  @GetMapping("/all")
  public List<java.util.Map<String, Object>> getAll() {
    return repository.findAllBasicInfo();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Product> getById(@PathVariable Long id) {
    return repository.findById(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  private final ServiceRepository serviceRepository;

  @GetMapping("/by-name")
  public ResponseEntity<Product> getByExactName(@RequestParam String name) {
    return serviceRepository.findByNameIgnoreCase(name)
      .map(s -> ResponseEntity.ok((Product) s))
      .orElse(ResponseEntity.notFound().build());
  }

  // Admin: partial update на базови полета
  @PatchMapping("/{id}")
  public ResponseEntity<?> patchProduct(@PathVariable Long id,
                                        @RequestBody Map<String, Object> updates) {
    return repository.findById(id).map(p -> {
      if (updates.containsKey("name"))
        p.setName((String) updates.get("name"));
      if (updates.containsKey("price"))
        p.setPrice(((Number) updates.get("price")).doubleValue());
      if (updates.containsKey("brand"))
        p.setBrand((String) updates.get("brand"));
      if (updates.containsKey("availability"))
        p.setAvailability(((Number) updates.get("availability")).intValue());
      if (updates.containsKey("rating"))
        p.setRating(((Number) updates.get("rating")).doubleValue());
      if (updates.containsKey("additionalDetails"))
        p.setAdditionalDetails((String) updates.get("additionalDetails"));
      if (updates.containsKey("imageUrl"))
        p.setImageUrl((String) updates.get("imageUrl"));
      return ResponseEntity.ok(repository.save(p));
    }).orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    if (repository.existsById(id)) {
      repository.deleteById(id);
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
  }

  @PostMapping("/{id}/rate")
  public ResponseEntity<?> rateProduct(@PathVariable Long id,
                                       @RequestBody java.util.Map<String, Object> body) {
    double newRating = ((Number) body.get("rating")).doubleValue();
    if (newRating < 1 || newRating > 5)
      return ResponseEntity.badRequest()
        .body(java.util.Map.of("error", "Рейтингът трябва да е между 1 и 5"));

    return repository.findById(id).map(p -> {
      int count = p.getRatingCount() != null ? p.getRatingCount() : 0;
      double current = p.getRating() != null ? p.getRating() : 0;
      double updated = (count * current + newRating) / (count + 1);
      p.setRating(Math.round(updated * 100.0) / 100.0);
      p.setRatingCount(count + 1);
      return ResponseEntity.ok(repository.save(p));
    }).orElse(ResponseEntity.notFound().build());
  }
}
