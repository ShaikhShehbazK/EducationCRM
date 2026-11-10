package in.sp.main.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.sp.main.entities.Employee;
import in.sp.main.repositories.EmployeeRepository;

@Service
public class EmployeServiceImpl implements EmployeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	@Override
	public Employee EmployeeLoginService(String email, String password) {

		Optional<Employee> employeeOptional = employeeRepository.findByEmail(email);

		if (employeeOptional.isPresent()) {

			Employee employee = employeeOptional.get();

			if (employee.getPassword().equals(password)) {
				return employee;
			}
		}

		return null;
	}

	@Override
	public Employee AddEmployeeDetailsService(Employee employee) {
		return employeeRepository.save(employee);
	}

	@Override
	public Employee editEmployeeDetailsService(String oldEmail, Employee newEmployee) {
		// TODO Auto-generated method stub
		 Employee oldEmploye = employeeRepository.findByEmail(oldEmail).orElse(null);
		 if (oldEmploye != null) {

		        // Get existing employee ID
		        newEmployee.setId(oldEmploye.getId());

		        // Update employee details
		        return employeeRepository.save(newEmployee);
		    }

		    return null;
	}

	@Override
	public void deleteEmployeeDetailsService(String email) {
		Optional<Employee> employee = employeeRepository.findByEmail(email);
		if(employee.isPresent()) {
			employeeRepository.delete(employee.get());
		}
		else {
			throw new RuntimeException("Employee not found with email: "+email);
		}
	}

	@Override
	public List<Employee> getAllEmployeeService() {
		return employeeRepository.findAll();
	}

	@Override
	public Optional<Employee> findByEmailService(String email) {
		// TODO Auto-generated method stub
		return employeeRepository.findByEmail(email);
	}
	
}
