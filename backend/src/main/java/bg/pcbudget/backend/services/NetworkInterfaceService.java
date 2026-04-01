package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.NetworkInterface;
import bg.pcbudget.backend.repositories.NetworkInterfaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class NetworkInterfaceService {

    private final NetworkInterfaceRepository repository;

    public List<NetworkInterface> getAll() { return repository.findAll(); }

    public Optional<NetworkInterface> getById(Long id) { return repository.findById(id); }

    public NetworkInterface save(NetworkInterface entity) { return repository.save(entity); }

    public void delete(Long id) { repository.deleteById(id); }
}
