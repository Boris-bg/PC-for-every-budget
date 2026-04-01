package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.Monitor;
import bg.pcbudget.backend.services.MonitorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products/monitors")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class MonitorController {

    private final MonitorService service;

    @GetMapping
    public List<Monitor> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Monitor> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Monitor create(@RequestBody Monitor entity) { return service.save(entity); }

    @PutMapping("/{id}")
    public ResponseEntity<Monitor> update(@PathVariable Long id, @RequestBody Monitor entity) {
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
