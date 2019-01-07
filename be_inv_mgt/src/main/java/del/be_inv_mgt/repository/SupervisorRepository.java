package del.be_inv_mgt.repository;

import del.be_inv_mgt.model.Supervisor;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SupervisorRepository extends MongoRepository<Supervisor, String> {
    Supervisor findBySupervisorID(String supervisorID);

    Supervisor findByName(String name);

    Supervisor findByEmail(String email);

    void deleteBySupervisorID(String supervisorID);

    List<Supervisor> findAllByNameContaining(String name);

    boolean existsByNameContaining(String name);
}
