package del.be_inv_mgt.repository;

import del.be_inv_mgt.model.Inventory;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface InventoryRepository extends MongoRepository<Inventory, String> {
    Inventory findByCode(String code);

    Inventory findByName(String name);

    List<Inventory> findAllByName(String name);

}
