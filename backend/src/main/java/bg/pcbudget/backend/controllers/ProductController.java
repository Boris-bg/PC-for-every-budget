package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.Product;
import bg.pcbudget.backend.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

  private final ProductRepository repository;

  @GetMapping("/search")
  public List<Product> search(@RequestParam String q) {
    if (q == null || q.trim().length() < 2) return List.of();
    return repository.searchByNameOrBrand(q.trim());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Product> getById(@PathVariable Long id) {
    return repository.findById(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping("/by-name")
  public ResponseEntity<Product> getByExactName(@RequestParam String name) {
    return repository.findByNameContainingIgnoreCase(name)
      .stream()
      .filter(p -> p.getName().equalsIgnoreCase(name))
      .findFirst()
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }
}
