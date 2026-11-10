package in.sp.main.services;


import java.util.List;
import java.util.Optional;

import in.sp.main.entities.Employee;

public interface EmployeService {
	Employee EmployeeLoginService(String email,String password);
	Employee AddEmployeeDetailsService(Employee employee);
	Employee editEmployeeDetailsService(String oldEmail, Employee newEmployee);
	void deleteEmployeeDetailsService(String email);
	List<Employee> getAllEmployeeService();
	Optional<Employee> findByEmailService(String email);
}
