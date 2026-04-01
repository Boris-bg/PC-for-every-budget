package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.CPU;
import bg.pcbudget.backend.repositories.CPURepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class CPUService {

    private final CPURepository repository;

    public List<CPU> getAll() { return repository.findAll(); }

    public Optional<CPU> getById(Long id) { return repository.findById(id); }

    public CPU save(CPU entity) { return repository.save(entity); }

    public void delete(Long id) { repository.deleteById(id); }
}
