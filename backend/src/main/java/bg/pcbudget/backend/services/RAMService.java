package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.RAM;
import bg.pcbudget.backend.repositories.RAMRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RAMService {

  private final RAMRepository ramRepository;

  public List<RAM> getAll() {
    return ramRepository.findAll();
  }

  public Optional<RAM> getById(Long id) {
    return ramRepository.findById(id);
  }

  public RAM save(RAM ram) {
    return ramRepository.save(ram);
  }

  public void delete(Long id) {
    ramRepository.deleteById(id);
  }
}
