package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.RAM;
import bg.pcbudget.backend.services.RAMService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products/ram")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200") // за development
public class RAMController {

  private final RAMService ramService;

  @GetMapping
  public List<RAM> getAll() {
    return ramService.getAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<RAM> getById(@PathVariable Long id) {
    return ramService.getById(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public RAM create(@RequestBody RAM ram) {
    return ramService.save(ram);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    ramService.delete(id);
    return ResponseEntity.noContent().build();
  }

}
