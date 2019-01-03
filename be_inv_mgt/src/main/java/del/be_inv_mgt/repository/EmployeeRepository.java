package del.be_inv_mgt.repository;

import del.be_inv_mgt.model.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EmployeeRepository extends MongoRepository<Employee, String> {
    Employee findByEmployeeID(String employeeID);

    Employee findByEmail(String email);

    List<Employee> findEmployeeBySupervisorID(String supervisorID);

    void deleteByEmployeeID(String employeeID);
}
