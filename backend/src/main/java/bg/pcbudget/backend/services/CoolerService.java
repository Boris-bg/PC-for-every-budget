package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.Cooler;
import bg.pcbudget.backend.repositories.CoolerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class CoolerService {

    private final CoolerRepository repository;

    public List<Cooler> getAll() { return repository.findAll(); }

    public Optional<Cooler> getById(Long id) { return repository.findById(id); }

    public Cooler save(Cooler entity) { return repository.save(entity); }

    public void delete(Long id) { repository.deleteById(id); }
}
