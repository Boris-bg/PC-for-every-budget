package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.Monitor;
import bg.pcbudget.backend.repositories.MonitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class MonitorService {

    private final MonitorRepository repository;

    public List<Monitor> getAll() { return repository.findAll(); }

    public Optional<Monitor> getById(Long id) { return repository.findById(id); }

    public Monitor save(Monitor entity) { return repository.save(entity); }

    public void delete(Long id) { repository.deleteById(id); }
}
