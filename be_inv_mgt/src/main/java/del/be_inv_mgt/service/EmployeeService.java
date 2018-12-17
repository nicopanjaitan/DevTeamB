package del.be_inv_mgt.service;

import del.be_inv_mgt.model.Employee;

import java.util.List;

public interface EmployeeService {
    List<Employee> getAllEmployee();

    Employee getEmployeeById(String employeeID);

    Employee getEmployeeByName(String name);

    List<Employee> getAllEmployeeBySupervisorId (String supervisorID);

    Employee createEmployee(Employee employee);

    Employee updateEmployeeById(String employeeID, Employee employee);

    Employee updatePasswordById(String employeeID, String supervisorID);

    boolean deleteEmployeeById(String employeeID);
}
