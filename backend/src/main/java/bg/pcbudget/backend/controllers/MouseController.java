package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.Mouse;
import bg.pcbudget.backend.services.MouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products/mice")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class MouseController {

    private final MouseService service;

    @GetMapping
    public List<Mouse> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Mouse> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Mouse create(@RequestBody Mouse entity) { return service.save(entity); }

    @PutMapping("/{id}")
    public ResponseEntity<Mouse> update(@PathVariable Long id, @RequestBody Mouse entity) {
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
