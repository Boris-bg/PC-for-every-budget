package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.PSU;
import bg.pcbudget.backend.services.PSUService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products/psu")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class PSUController {

    private final PSUService service;

    @GetMapping
    public List<PSU> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<PSU> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public PSU create(@RequestBody PSU entity) { return service.save(entity); }

    @PutMapping("/{id}")
    public ResponseEntity<PSU> update(@PathVariable Long id, @RequestBody PSU entity) {
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
