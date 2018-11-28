package del.be_inv_mgt.service.impl;

import del.be_inv_mgt.model.Employee;
import del.be_inv_mgt.repository.EmployeeRepository;
import del.be_inv_mgt.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployee(){
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(String empId){
        return employeeRepository.findBy_id(empId);
    }

    public Employee createEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    public Employee updateEmployeeById(String empId, Employee employee) {
        employee.set_id(empId);
        employeeRepository.save(employee);
        return employee;
    }

    public int deleteEmployeeById(String empId) {
        employeeRepository.deleteById(empId);
        return 1;
    }
}
