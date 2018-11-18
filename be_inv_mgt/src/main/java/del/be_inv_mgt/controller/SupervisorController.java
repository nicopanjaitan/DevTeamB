package del.be_inv_mgt.controller;

import del.be_inv_mgt.model.Supervisor;
import del.be_inv_mgt.service.SupervisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/inv_mgt/supervisor")
public class SupervisorController {
    @Autowired
    private SupervisorService supervisorService;

    @GetMapping("/getAll")
    public List<Supervisor> getAllSupervisor(){
        return supervisorService.getAllSupervisor();
    }

    @GetMapping("/getById/{id}")
    public Supervisor getById(@PathVariable("id") String supervId){
        return supervisorService.getSupervisorById(supervId);
    }

    @PostMapping("/create")
    public Supervisor create(@Valid @RequestBody Supervisor supervisor){
        return supervisorService.createSupervisor(supervisor);
    }

    @PutMapping(value = "/updateById/{id}")
    public Supervisor updateById(@PathVariable("id") String supervisorId, @Valid @RequestBody Supervisor supervisor) {
        supervisor.set_id(supervisorId);
        supervisorService.updateSupervisorById(supervisorId, supervisor);
        return supervisor;
    }

    @DeleteMapping("/deleteById/{id}")
    public int deleteById(@PathVariable("id") String supervisorId) {
        supervisorService.deleteSupervisorById(supervisorId);
        return 1;
    }
}
