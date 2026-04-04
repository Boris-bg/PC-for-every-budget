package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.Box;
import bg.pcbudget.backend.repositories.BoxRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BoxService {

  private final BoxRepository repository;

  public List<Box> getAll() { return repository.findAll(); }

  public Optional<Box> getById(Long id) { return repository.findById(id); }

  public Box save(Box box) { return repository.save(box); }

  public void delete(Long id) { repository.deleteById(id); }
}
