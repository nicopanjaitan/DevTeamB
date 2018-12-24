package del.be_inv_mgt.controller;

import del.be_inv_mgt.controller.addition.GlobalController;
import del.be_inv_mgt.model.Supervisor;
import del.be_inv_mgt.model.respon.Response;
import del.be_inv_mgt.service.SupervisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/inv_mgt/supervisor")
public class SupervisorController extends GlobalController {
    @Autowired
    private SupervisorService supervisorService;

    @GetMapping("/getAll")
    public Response<List<Supervisor>> getAll(){
        return toResponse(supervisorService.getAllSupervisor());
    }

    @GetMapping("/getById/{supervisorID}")
    public Response<Supervisor> getById(@PathVariable String supervisorID){
        return toResponse(supervisorService.getSupervisorById(supervisorID));
    }

    @PostMapping("/create")
    public Response<Supervisor> create(@Valid @RequestBody Supervisor supervisor){
        return toResponse(supervisorService.createSupervisor(supervisor));
    }

    @PutMapping(value = "/updateById/{supervisorID}")
    public Response<Supervisor> updateById(@PathVariable String supervisorID, @Valid @RequestBody Supervisor supervisor) {
        return toResponse(supervisorService.updateSupervisorById(supervisorID, supervisor));
    }

    @DeleteMapping("/deleteById/{supervisorID}")
    public Response<Boolean> deleteById(@PathVariable String supervisorID) {
        return toResponse(supervisorService.deleteSupervisorById(supervisorID));
    }
}
