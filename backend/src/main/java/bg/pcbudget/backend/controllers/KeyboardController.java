package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.Keyboard;
import bg.pcbudget.backend.services.KeyboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products/keyboards")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class KeyboardController {

    private final KeyboardService service;

    @GetMapping
    public List<Keyboard> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Keyboard> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Keyboard create(@RequestBody Keyboard entity) { return service.save(entity); }

    @PutMapping("/{id}")
    public ResponseEntity<Keyboard> update(@PathVariable Long id, @RequestBody Keyboard entity) {
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
