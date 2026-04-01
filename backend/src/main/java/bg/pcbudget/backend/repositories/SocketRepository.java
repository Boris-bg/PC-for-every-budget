package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.Socket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SocketRepository extends JpaRepository<Socket, Long> {

}
