package del.be_inv_mgt.controller;

import del.be_inv_mgt.controller.addition.GlobalController;
import del.be_inv_mgt.model.Inventory;
import del.be_inv_mgt.model.respon.Response;
import del.be_inv_mgt.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/inv_mgt/inventory")
public class InventoryController extends GlobalController {
    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/getAll")
    public Response<List<Inventory>> getAll(){
        return toResponse(inventoryService.getAllInventory());
    }

    @GetMapping("/getById/{code}")
    public Response<Inventory> getById(@PathVariable String code){
        return toResponse(inventoryService.getInventoryByCode(code));
    }

    @GetMapping("/getByName/{name}")
    public Response<Inventory> getByName(@PathVariable String name){
        return toResponse(inventoryService.getInventoryByName(name));
    }

    @PostMapping("/create")
    public Response<Inventory> create(@Valid @RequestBody Inventory inventory){
        return toResponse(inventoryService.createInventory(inventory));
    }

    @PutMapping(value = "/updateById/{code}")
    public Response<Inventory> updateById(@PathVariable String code, @RequestBody Inventory inventory) {
        return toResponse(inventoryService.updateInventoryByCode(code, inventory));
    }

    @PutMapping(value = "/updateStockById/{code}")
    public Response<Inventory> updateStockById(@PathVariable String code, @RequestBody Inventory inventory){
        return toResponse(inventoryService.updateInventoryStockByCode(code, inventory.getStock()));
    }

    @DeleteMapping("/deleteById/{code}")
    public Response<Boolean> deleteById(@PathVariable String code) {
        return toResponse(inventoryService.deleteInventoryByCode(code));
    }
}
