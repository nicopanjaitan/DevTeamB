package del.be_inv_mgt.service;

import del.be_inv_mgt.model.Inventory;
import org.springframework.stereotype.Service;

import java.util.List;

public interface InventoryService {
    List<Inventory> getAllInventory();

    Inventory getInventoryByCode(String code);

    Inventory getInventoryByName(String name);

    Inventory createInventory(Inventory inventory, String image);

    Inventory updateInventoryByCode(String code, Inventory inventory);

    Inventory updateInventoryStockByCode(String code, int newStock);

    boolean deleteInventoryByCode(String code);
}
