package del.be_inv_mgt.controller;

import del.be_inv_mgt.model.Inventory;
import del.be_inv_mgt.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/inv_mgt/inventory")
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/showAllInv")
    public String showAllInv(){
        return "inventory";
    }

    @GetMapping("/test")
    public String testView(){
        return "index";
    }

    @GetMapping("/getAll")
    public List<Inventory> getAllInventory(){
        return inventoryService.getAllInventory();
    }

    @GetMapping("/getById/{id}")
    public Inventory getById(@PathVariable("id") String invId){
        return inventoryService.getInventoryById(invId);
    }

    @PostMapping("/create")
    public Inventory create(@Valid @RequestBody Inventory inventory){
        return inventoryService.createInventory(inventory);
    }

    @PutMapping(value = "/updateById/{id}")
    public Inventory updateById(@PathVariable("id") String invId, @Valid @RequestBody Inventory inventory) {
        inventory.set_id(invId);
        inventoryService.updateInventoryById(invId, inventory);
        return inventory;
    }

    public String updateStockById(){
        return "";
    }

    @DeleteMapping("/deleteById/{id}")
    public int deleteById(@PathVariable("id") String _invId) {
        inventoryService.deleteInventoryById(_invId);
        return 1;
    }
}
