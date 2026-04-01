package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.Accessory;
import bg.pcbudget.backend.services.AccessoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products/accessories")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AccessoryController {

    private final AccessoryService service;

    @GetMapping
    public List<Accessory> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Accessory> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Accessory create(@RequestBody Accessory entity) { return service.save(entity); }

    @PutMapping("/{id}")
    public ResponseEntity<Accessory> update(@PathVariable Long id, @RequestBody Accessory entity) {
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
