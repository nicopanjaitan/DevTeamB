package del.be_inv_mgt.service.impl;

import del.be_inv_mgt.exception.ResourceNotFoundException;
import del.be_inv_mgt.model.respon.ErrorCode;
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
        List<Inventory> inventories = inventoryRepository.findAll();

        if(inventories.isEmpty()){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return inventories;
    }

    public List<Inventory> getAllEmployeeBySupervisorId(){
        List<Inventory> inventories = inventoryRepository.findAll();

        if(inventories.isEmpty()){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return inventories;
    }

    public Inventory getInventoryByCode(String code){
        Inventory inventory = inventoryRepository.findByCode(code);

        if(inventory == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }
        return inventory;
    }

    public Inventory getInventoryByName(String name){
        Inventory inventory = inventoryRepository.findByName(name);

        if(inventory == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return inventory;
    }

    public Inventory createInventory(Inventory inventoryNew){
        Inventory inventory = inventoryRepository.findByCode(inventoryNew.getCode());

        if (inventory != null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return inventoryRepository.save(inventory);
    }

    public Inventory updateInventoryByCode(String code, Inventory inventoryUpd) {
        Inventory inventory = inventoryRepository.findByCode(code);

        if(inventory == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }else{
            inventory.setCode(code);
            inventory.setId(inventory.getId());

            inventory.setName(inventoryUpd.getName());
            inventory.setDetail(inventoryUpd.getDetail());
            inventory.setPrice(inventoryUpd.getPrice());
            inventory.setStock(inventoryUpd.getStock());
            inventory.setImage(inventoryUpd.getImage());

            inventoryRepository.save(inventory);
        }

        return inventory;
    }

    public Inventory updateInventoryStockByCode(String code, int stock){
        Inventory inventory = inventoryRepository.findByCode(code);

        if(inventory == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }else{
            inventory.setCode(code);
            inventory.setStock(stock);
            inventoryRepository.save(inventory);
        }

        return inventory;
    }

    public boolean deleteInventoryByCode(String code) {
        Inventory inventory = inventoryRepository.findByCode(code);

        if (inventory == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }
        else{
            inventoryRepository.deleteById(code);
        }

        return true;
    }
}

