package del.be_inv_mgt.service;

import del.be_inv_mgt.model.Employee;

import java.util.List;

public interface EmployeeService {
    List<Employee> getAllEmployee();

    Employee getEmployeeById(String employeeID);

    List<Employee> getAllEmployeeBySupervisorId (String supervisorID);

    Employee createEmployee(Employee employee);

    Employee updateEmployeeById(String employeeID, Employee employee);

    Employee selectSupervisor(String employeeID, Employee supervisorID);

    boolean deleteEmployeeById(String employeeID);
}
