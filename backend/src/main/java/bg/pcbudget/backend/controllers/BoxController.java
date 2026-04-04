package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.Box;
import bg.pcbudget.backend.services.BoxService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products/boxes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class BoxController {

  private final BoxService service;

  @GetMapping
  public List<Box> getAll() { return service.getAll(); }

  @GetMapping("/{id}")
  public ResponseEntity<Box> getById(@PathVariable Long id) {
    return service.getById(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public Box create(@RequestBody Box box) { return service.save(box); }

  @PutMapping("/{id}")
  public ResponseEntity<Box> update(@PathVariable Long id, @RequestBody Box box) {
    if (service.getById(id).isEmpty()) return ResponseEntity.notFound().build();
    box.setId(id);
    return ResponseEntity.ok(service.save(box));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    service.delete(id);
    return ResponseEntity.noContent().build();
  }
}
