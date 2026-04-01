package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.Mouse;
import bg.pcbudget.backend.repositories.MouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class MouseService {

    private final MouseRepository repository;

    public List<Mouse> getAll() { return repository.findAll(); }

    public Optional<Mouse> getById(Long id) { return repository.findById(id); }

    public Mouse save(Mouse entity) { return repository.save(entity); }

    public void delete(Long id) { repository.deleteById(id); }
}
