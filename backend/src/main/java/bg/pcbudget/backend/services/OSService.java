package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.OS;
import bg.pcbudget.backend.repositories.OSRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class OSService {

    private final OSRepository repository;

    public List<OS> getAll() { return repository.findAll(); }

    public Optional<OS> getById(Long id) { return repository.findById(id); }

    public OS save(OS entity) { return repository.save(entity); }

    public void delete(Long id) { repository.deleteById(id); }
}
