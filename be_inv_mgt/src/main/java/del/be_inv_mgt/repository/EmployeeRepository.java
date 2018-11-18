package del.be_inv_mgt.repository;

import del.be_inv_mgt.model.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmployeeRepository extends MongoRepository<Employee, String> {
    Employee findBy_id(String id);
}
