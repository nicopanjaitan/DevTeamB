package del.be_inv_mgt.repository;

import del.be_inv_mgt.model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<Users, String> {
    Users findByUsername(String username);
}
