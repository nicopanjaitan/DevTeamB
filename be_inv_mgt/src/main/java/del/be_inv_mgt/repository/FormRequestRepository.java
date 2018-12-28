package del.be_inv_mgt.repository;

import del.be_inv_mgt.model.FormRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.text.Normalizer;
import java.util.List;

public interface FormRequestRepository extends MongoRepository<FormRequest, String> {
    FormRequest findByRequestID(String requestID);

    List<FormRequest> findByEmployeeID(String employeeID);

    List<FormRequest> findBySupervisorID(String supervisorID);

    List<FormRequest> findByStatus(String supervisorID);

    Boolean deleteByRequestIDEquals(String requestID);
}
