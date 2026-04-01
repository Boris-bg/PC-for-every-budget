package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.OrderItem;
import bg.pcbudget.backend.repositories.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class OrderItemService {

    private final OrderItemRepository repository;

    public List<OrderItem> getAll() { return repository.findAll(); }

    public Optional<OrderItem> getById(Long id) { return repository.findById(id); }

    public OrderItem save(OrderItem entity) { return repository.save(entity); }

    public void delete(Long id) { repository.deleteById(id); }
}
