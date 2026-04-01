package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.Socket;
import bg.pcbudget.backend.services.SocketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sockets")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class SocketController {

    private final SocketService service;

    @GetMapping
    public List<Socket> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Socket> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Socket create(@RequestBody Socket entity) { return service.save(entity); }

    @PutMapping("/{id}")
    public ResponseEntity<Socket> update(@PathVariable Long id, @RequestBody Socket entity) {
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
