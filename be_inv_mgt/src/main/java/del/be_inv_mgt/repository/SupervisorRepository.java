package del.be_inv_mgt.repository;

import del.be_inv_mgt.model.Supervisor;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SupervisorRepository extends MongoRepository<Supervisor, String> {
    Supervisor findBy_id(String id);
}
