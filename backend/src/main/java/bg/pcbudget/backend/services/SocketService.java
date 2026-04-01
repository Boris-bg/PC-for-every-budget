package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.Socket;
import bg.pcbudget.backend.repositories.SocketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class SocketService {

    private final SocketRepository repository;

    public List<Socket> getAll() { return repository.findAll(); }

    public Optional<Socket> getById(Long id) { return repository.findById(id); }

    public Socket save(Socket entity) { return repository.save(entity); }

    public void delete(Long id) { repository.deleteById(id); }
}
