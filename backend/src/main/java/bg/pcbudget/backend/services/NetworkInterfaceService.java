package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.ItemInterface;
import bg.pcbudget.backend.repositories.NetworkInterfaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class NetworkInterfaceService {

    private final NetworkInterfaceRepository repository;

    public List<ItemInterface> getAll() { return repository.findAll(); }

    public Optional<ItemInterface> getById(Long id) { return repository.findById(id); }

    public ItemInterface save(ItemInterface entity) { return repository.save(entity); }

    public void delete(Long id) { repository.deleteById(id); }
}
