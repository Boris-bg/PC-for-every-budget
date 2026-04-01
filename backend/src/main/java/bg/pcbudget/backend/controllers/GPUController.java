package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.GPU;
import bg.pcbudget.backend.services.GPUService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products/gpu")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class GPUController {

    private final GPUService service;

    @GetMapping
    public List<GPU> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<GPU> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public GPU create(@RequestBody GPU entity) { return service.save(entity); }

    @PutMapping("/{id}")
    public ResponseEntity<GPU> update(@PathVariable Long id, @RequestBody GPU entity) {
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
