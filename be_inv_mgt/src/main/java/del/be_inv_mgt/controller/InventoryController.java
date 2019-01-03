package del.be_inv_mgt.controller;

import del.be_inv_mgt.controller.addition.GlobalController;
import del.be_inv_mgt.model.Inventory;
import del.be_inv_mgt.model.respon.Response;
import del.be_inv_mgt.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    public Response<Inventory> create(@Valid @ModelAttribute Inventory inventory, @RequestParam MultipartFile file){
        String images = null;
        System.out.println(inventory + "\n" + file);
        try{
            images = saveUploadedFiles(file, "inventory");
        }
        catch (IOException e){}

        return toResponse(inventoryService.createInventory(inventory, images));
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


    private static String ROOT_DIR = new File("").getAbsolutePath() + "/images/";

    private String saveUploadedFiles(MultipartFile file, String dir) throws IOException {
        String UPLOAD_DIR = ROOT_DIR + dir;

        // Make sure directory exists!
        File uploadDir = new File(UPLOAD_DIR);
        uploadDir.mkdirs();

        String uploadFilePath = UPLOAD_DIR + "/" + file.getOriginalFilename();
        byte[] bytes = file.getBytes();
        Path path = Paths.get(uploadFilePath);
        Files.write(path, bytes);

        return file.getOriginalFilename();
    }
}
