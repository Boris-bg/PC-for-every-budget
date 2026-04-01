package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.Cooler;
import bg.pcbudget.backend.services.CoolerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products/coolers")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class CoolerController {

    private final CoolerService service;

    @GetMapping
    public List<Cooler> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Cooler> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Cooler create(@RequestBody Cooler entity) { return service.save(entity); }

    @PutMapping("/{id}")
    public ResponseEntity<Cooler> update(@PathVariable Long id, @RequestBody Cooler entity) {
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
