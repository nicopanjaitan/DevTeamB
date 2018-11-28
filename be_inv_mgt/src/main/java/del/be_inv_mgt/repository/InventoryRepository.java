package del.be_inv_mgt.repository;

import del.be_inv_mgt.model.Inventory;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InventoryRepository extends MongoRepository<Inventory, String> {
    Inventory findBy_id(String id);
}
