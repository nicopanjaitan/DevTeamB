package del.be_inv_mgt.service.impl;

import del.be_inv_mgt.exception.ResourceNotFoundException;
import del.be_inv_mgt.model.Employee;
import del.be_inv_mgt.model.respon.ErrorCode;
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
        List<Employee> employees = employeeRepository.findAll();

        if(employees.isEmpty()){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return employees;
    }

    public List<Employee> getAllEmployeeBySupervisorId(String supervisorID){
        List<Employee> employees = employeeRepository.findEmployeeBySupervisorID(supervisorID);

        if(employees.isEmpty()){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return employees;
    }

    public Employee getEmployeeById(String employeeID){
        Employee employee = employeeRepository.findByEmployeeID(employeeID);

        if(employee == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return employee;
    }

    public Employee createEmployee(Employee employeeNew){
        Employee employee = employeeRepository.findByEmail(employeeNew.getEmail());

        if(employee != null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return employeeRepository.save(employeeNew);
    }

    public Employee updateEmployeeById(String employeeID, Employee employeeUpd) {
        Employee employee = employeeRepository.findByEmployeeID(employeeID);

        if(employee == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }else{
            employee.setName(employeeUpd.getName());
            employee.setEmail(employeeUpd.getEmail());
            employee.setPassword(employeeUpd.getPassword());
            employee.setAddress(employeeUpd.getAddress());

            employeeRepository.save(employee);
        }

        return employee;
    }

    public Employee selectSupervisor(String employeeID, Employee employeeUpd) {
        Employee employee = employeeRepository.findByEmployeeID(employeeID);

        if(employee == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }else{
            employee.setSupervisorID(employeeUpd.getSupervisorID());

            employeeRepository.save(employee);
        }

        return employee;
    }

    public boolean deleteEmployeeById(String employeeID) {
        Employee employee = employeeRepository.findByEmployeeID(employeeID);

        if (employee == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        employeeRepository.deleteByEmployeeIDEquals(employeeID);

        return true;

    }
}
