package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.CPU;
import bg.pcbudget.backend.services.CPUService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products/cpu")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class CPUController {

    private final CPUService service;

    @GetMapping
    public List<CPU> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<CPU> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CPU create(@RequestBody CPU entity) { return service.save(entity); }

    @PutMapping("/{id}")
    public ResponseEntity<CPU> update(@PathVariable Long id, @RequestBody CPU entity) {
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
