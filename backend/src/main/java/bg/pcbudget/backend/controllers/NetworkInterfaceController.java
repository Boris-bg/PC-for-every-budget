package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.ItemInterface;
import bg.pcbudget.backend.services.NetworkInterfaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/interfaces")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class NetworkInterfaceController {

    private final NetworkInterfaceService service;

    @GetMapping
    public List<ItemInterface> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<ItemInterface> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ItemInterface create(@RequestBody ItemInterface entity) { return service.save(entity); }

    @PutMapping("/{id}")
    public ResponseEntity<ItemInterface> update(@PathVariable Long id, @RequestBody ItemInterface entity) {
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
