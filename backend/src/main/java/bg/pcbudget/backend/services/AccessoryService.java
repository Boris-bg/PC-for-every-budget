package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.Accessory;
import bg.pcbudget.backend.repositories.AccessoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class AccessoryService {

    private final AccessoryRepository repository;

    public List<Accessory> getAll() { return repository.findAll(); }

    public Optional<Accessory> getById(Long id) { return repository.findById(id); }

    public Accessory save(Accessory entity) { return repository.save(entity); }

    public void delete(Long id) { repository.deleteById(id); }
}
