package del.be_inv_mgt.service.impl;

import del.be_inv_mgt.exception.ResourceNotFoundException;
import del.be_inv_mgt.model.respon.ErrorCode;
import del.be_inv_mgt.model.Inventory;
import del.be_inv_mgt.repository.InventoryRepository;
import del.be_inv_mgt.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    public Inventory createInventory(Inventory inventoryNew, String image){
        Inventory inventory = inventoryRepository.findByName(inventoryNew.getName());

        if (inventory != null){
            throw new ResourceNotFoundException(ErrorCode.BAD_REQUEST.getCode(), ErrorCode.BAD_REQUEST.getMessage());
        }

        inventoryNew.setCode("inv_"+getDate());
        if(image == null){
            inventoryNew.setImage("/images/inventory/ims_logo.png");
        }
        else {
            inventoryNew.setImage("/images/inventory/" + image);
        }

        return inventoryRepository.save(inventoryNew);
    }

    public Inventory updateInventoryByCode(String code, Inventory inventoryUpd) {
        Inventory inventory = inventoryRepository.findByCode(code);

        if(inventory == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }else{
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

        inventoryRepository.deleteByCode(code);

        return true;

    }

    static String getDate(){
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime now = LocalDateTime.now();

        String dateTimeNow = dtf.format(now);

        return dateTimeNow;
    }
}

