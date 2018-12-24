package del.be_inv_mgt.controller;

import del.be_inv_mgt.controller.addition.GlobalController;
import del.be_inv_mgt.model.Employee;
import del.be_inv_mgt.model.respon.Response;
import del.be_inv_mgt.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/inv_mgt/employee")
public class EmployeeController extends GlobalController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/getAll")
    public Response<List<Employee>> getAll(){
        return toResponse(employeeService.getAllEmployee());
    }

    @GetMapping("/getBySupervisorId/{supervisorID}")
    public Response<List<Employee>> getBySupervisorId(@PathVariable String supervisorID){
        return toResponse(employeeService.getAllEmployeeBySupervisorId(supervisorID));
    }

    @GetMapping("/getById/{employeeID}")
    public Response<Employee> getById(@PathVariable String employeeID){
        return toResponse(employeeService.getEmployeeById(employeeID));
    }

    @PostMapping("/create")
    public Response<Employee> create(@Valid @RequestBody Employee employee){
        return toResponse(employeeService.createEmployee(employee));
    }

    @PutMapping(value = "/updateById/{employeeID}")
    public Response<Employee> updateById(@PathVariable String employeeID, @Valid @RequestBody Employee employee) {
        return toResponse(employeeService.updateEmployeeById(employeeID, employee));
    }

    @PutMapping(value = "/selectSupervisorById/{employeeID}")
    public Response<Employee> selectSupervisorById(@PathVariable String employeeID, @Valid @RequestBody Employee supervisorID) {
        return toResponse(employeeService.selectSupervisor(employeeID, supervisorID));
    }

    @DeleteMapping("/deleteById/{employeeID}")
    public Response<Boolean> deleteById(@PathVariable String employeeID) {
        return toResponse(employeeService.deleteEmployeeById(employeeID));
    }


}
