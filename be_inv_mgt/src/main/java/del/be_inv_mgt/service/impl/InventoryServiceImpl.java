package del.be_inv_mgt.service.impl;

import del.be_inv_mgt.model.Inventory;
import del.be_inv_mgt.repository.InventoryRepository;
import del.be_inv_mgt.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryServiceImpl implements InventoryService {
    @Autowired
    private InventoryRepository inventoryRepository;

    public List<Inventory> getAllInventory(){
        return inventoryRepository.findAll();
    }

    public Inventory getInventoryById(String invId){
        return inventoryRepository.findBy_id(invId);
    }

    public Inventory createInventory(Inventory inventory){
        return inventoryRepository.save(inventory);
    }

    public Inventory updateInventoryById(String invId, Inventory inventory) {
        inventory.set_id(invId);
        inventoryRepository.save(inventory);
        return inventory;
    }

    public int deleteInventoryById(String invId) {
        inventoryRepository.deleteById(invId);
        return 1;
    }
}

