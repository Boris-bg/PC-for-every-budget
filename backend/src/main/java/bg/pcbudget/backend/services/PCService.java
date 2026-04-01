package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.PC;
import bg.pcbudget.backend.repositories.PCRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class PCService {

    private final PCRepository repository;

    public List<PC> getAll() { return repository.findAll(); }

    public Optional<PC> getById(Long id) { return repository.findById(id); }

    public PC save(PC entity) { return repository.save(entity); }

    public void delete(Long id) { repository.deleteById(id); }
}
