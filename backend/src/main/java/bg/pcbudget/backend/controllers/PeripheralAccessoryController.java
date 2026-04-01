package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.PeripheralAccessory;
import bg.pcbudget.backend.services.PeripheralAccessoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products/peripheral-accessories")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class PeripheralAccessoryController {

    private final PeripheralAccessoryService service;

    @GetMapping
    public List<PeripheralAccessory> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<PeripheralAccessory> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public PeripheralAccessory create(@RequestBody PeripheralAccessory entity) { return service.save(entity); }

    @PutMapping("/{id}")
    public ResponseEntity<PeripheralAccessory> update(@PathVariable Long id, @RequestBody PeripheralAccessory entity) {
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
