package del.be_inv_mgt.service;

import del.be_inv_mgt.model.Employee;

import java.util.List;

public interface EmployeeService {
    List<Employee> getAllEmployee();

    Employee getEmployeeById(String empId);

    Employee createEmployee(Employee employee);

    Employee updateEmployeeById(String empId, Employee employee);

    int deleteEmployeeById(String empId);
}
