package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.ROM;
import bg.pcbudget.backend.services.ROMService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products/rom")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ROMController {

    private final ROMService service;

    @GetMapping
    public List<ROM> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<ROM> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ROM create(@RequestBody ROM entity) { return service.save(entity); }

    @PutMapping("/{id}")
    public ResponseEntity<ROM> update(@PathVariable Long id, @RequestBody ROM entity) {
        if (service.getById(id).isEmpty()) return ResponseEntity.notFound().build();
        entity.setId(id);
        return ResponseEntity.ok(service.save(entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
