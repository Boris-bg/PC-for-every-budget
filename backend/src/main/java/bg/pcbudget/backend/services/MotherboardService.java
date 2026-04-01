package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.Motherboard;
import bg.pcbudget.backend.repositories.MotherboardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class MotherboardService {

    private final MotherboardRepository repository;

    public List<Motherboard> getAll() { return repository.findAll(); }

    public Optional<Motherboard> getById(Long id) { return repository.findById(id); }

    public Motherboard save(Motherboard entity) { return repository.save(entity); }

    public void delete(Long id) { repository.deleteById(id); }
}
