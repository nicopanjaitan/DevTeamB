package del.be_inv_mgt.service.impl;

import del.be_inv_mgt.exception.ResourceNotFoundException;
import del.be_inv_mgt.model.Employee;
import del.be_inv_mgt.model.respon.ErrorCode;
import del.be_inv_mgt.repository.EmployeeRepository;
import del.be_inv_mgt.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
            throw new ResourceNotFoundException(ErrorCode.BAD_REQUEST.getCode(), ErrorCode.BAD_REQUEST.getMessage());
        }

        employeeNew.setEmployeeID("emp_"+getDate());

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

        employeeRepository.deleteByEmployeeID(employeeID);

        return true;

    }

    public Employee login(Employee employeelogin){
        Employee employee = employeeRepository.findByEmail(employeelogin.getEmail());

        if(employee == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        if(!employee.getPassword().equals(employeelogin.getPassword())){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return employee;
    }

    static String getDate(){
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime now = LocalDateTime.now();

        String dateTimeNow = dtf.format(now);

        return dateTimeNow;
    }
}
