package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.User;
import bg.pcbudget.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

  private final UserRepository repository;
  private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  public List<User> getAll() {
    return repository.findAllByOrderByIdAsc();
  }

  public Optional<User> getById(Long id) {
    return repository.findById(id);
  }

  public Optional<User> getByUsername(String username) {
    return repository.findByUsername(username);
  }

  public User register(User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setRole(User.Role.USER);
    return repository.save(user);
  }

  public void delete(Long id) {
    repository.deleteById(id);
  }

  public User save(User user) {
    return repository.save(user);
  }
}
