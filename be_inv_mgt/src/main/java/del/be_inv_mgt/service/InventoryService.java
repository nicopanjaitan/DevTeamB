package del.be_inv_mgt.service;

import del.be_inv_mgt.model.Inventory;
import org.springframework.stereotype.Service;

import java.util.List;

public interface InventoryService {
    List<Inventory> getAllInventory();

    Inventory getInventoryById(String invId);

    Inventory createInventory(Inventory inventory);

    Inventory updateInventoryById(String invId, Inventory inventory);

    int deleteInventoryById(String _invId);
}
