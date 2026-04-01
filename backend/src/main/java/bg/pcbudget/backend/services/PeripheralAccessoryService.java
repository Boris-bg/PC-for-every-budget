package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.PeripheralAccessory;
import bg.pcbudget.backend.repositories.PeripheralAccessoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class PeripheralAccessoryService {

    private final PeripheralAccessoryRepository repository;

    public List<PeripheralAccessory> getAll() { return repository.findAll(); }

    public Optional<PeripheralAccessory> getById(Long id) { return repository.findById(id); }

    public PeripheralAccessory save(PeripheralAccessory entity) { return repository.save(entity); }

    public void delete(Long id) { repository.deleteById(id); }
}
