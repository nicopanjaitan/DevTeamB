package del.be_inv_mgt.repository;

import del.be_inv_mgt.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findBy_id(String id);
}
