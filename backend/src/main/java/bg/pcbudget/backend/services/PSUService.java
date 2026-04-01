package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.PSU;
import bg.pcbudget.backend.repositories.PSURepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class PSUService {

    private final PSURepository repository;

    public List<PSU> getAll() { return repository.findAll(); }

    public Optional<PSU> getById(Long id) { return repository.findById(id); }

    public PSU save(PSU entity) { return repository.save(entity); }

    public void delete(Long id) { repository.deleteById(id); }
}
