package del.be_inv_mgt.repository;

import del.be_inv_mgt.model.Supervisor;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SupervisorRepository extends MongoRepository<Supervisor, String> {
    Supervisor findBySupervisorID(String supervisorID);

    Supervisor findByName(String name);

    Supervisor findByEmail(String email);

    void deleteBySupervisorID(String supervisorID);
}
