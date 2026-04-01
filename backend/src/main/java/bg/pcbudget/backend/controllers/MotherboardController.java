package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.Motherboard;
import bg.pcbudget.backend.services.MotherboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products/motherboards")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class MotherboardController {

    private final MotherboardService service;

    @GetMapping
    public List<Motherboard> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Motherboard> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Motherboard create(@RequestBody Motherboard entity) { return service.save(entity); }

    @PutMapping("/{id}")
    public ResponseEntity<Motherboard> update(@PathVariable Long id, @RequestBody Motherboard entity) {
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
