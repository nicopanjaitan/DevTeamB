package del.be_inv_mgt.controller;

import del.be_inv_mgt.model.Employee;
import del.be_inv_mgt.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/inv_mgt/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/getAll")
    public List<Employee> getAllSupervisor(){
        return employeeService.getAllEmployee();
    }

    @GetMapping("/getById/{id}")
    public Employee getById(@PathVariable("id") String empId){
        return employeeService.getEmployeeById(empId);
    }

    @PostMapping("/create")
    public Employee create(@Valid @RequestBody Employee employee){
        return employeeService.createEmployee(employee);
    }

    @PutMapping(value = "/updateById/{id}")
    public Employee updateById(@PathVariable("id") String empId, @Valid @RequestBody Employee employee) {
        employee.set_id(empId);
        employeeService.updateEmployeeById(empId, employee);
        return employee;
    }

    @DeleteMapping("/deleteById/{id}")
    public int deleteById(@PathVariable("id") String empId) {
        employeeService.deleteEmployeeById(empId);
        return 1;
    }
}
