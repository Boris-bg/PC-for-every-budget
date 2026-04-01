package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.OS;
import bg.pcbudget.backend.services.OSService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products/os")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class OSController {

    private final OSService service;

    @GetMapping
    public List<OS> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<OS> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public OS create(@RequestBody OS entity) { return service.save(entity); }

    @PutMapping("/{id}")
    public ResponseEntity<OS> update(@PathVariable Long id, @RequestBody OS entity) {
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
