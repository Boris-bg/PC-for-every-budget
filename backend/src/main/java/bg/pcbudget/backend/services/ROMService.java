package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.ROM;
import bg.pcbudget.backend.repositories.ROMRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class ROMService {

    private final ROMRepository repository;

    public List<ROM> getAll() { return repository.findAll(); }

    public Optional<ROM> getById(Long id) { return repository.findById(id); }

    public ROM save(ROM entity) { return repository.save(entity); }

    public void delete(Long id) { repository.deleteById(id); }
}
