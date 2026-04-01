package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.GPU;
import bg.pcbudget.backend.repositories.GPURepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class GPUService {

    private final GPURepository repository;

    public List<GPU> getAll() { return repository.findAll(); }

    public Optional<GPU> getById(Long id) { return repository.findById(id); }

    public GPU save(GPU entity) { return repository.save(entity); }

    public void delete(Long id) { repository.deleteById(id); }
}
