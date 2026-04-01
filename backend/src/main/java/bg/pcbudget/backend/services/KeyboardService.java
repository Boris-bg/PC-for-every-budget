package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.Keyboard;
import bg.pcbudget.backend.repositories.KeyboardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class KeyboardService {

    private final KeyboardRepository repository;

    public List<Keyboard> getAll() { return repository.findAll(); }

    public Optional<Keyboard> getById(Long id) { return repository.findById(id); }

    public Keyboard save(Keyboard entity) { return repository.save(entity); }

    public void delete(Long id) { repository.deleteById(id); }
}
