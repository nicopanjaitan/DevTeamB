package del.be_inv_mgt.repository;

import del.be_inv_mgt.model.FormRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.text.Normalizer;

public interface FormRequestRepository extends MongoRepository<FormRequest, String> {
    FormRequest findBy_id(String id);
}
