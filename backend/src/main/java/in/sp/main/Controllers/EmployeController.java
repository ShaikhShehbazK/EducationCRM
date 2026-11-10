package in.sp.main.Controllers;


import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import in.sp.main.entities.Employee;
import in.sp.main.services.EmployeService;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class EmployeController {
	
	@Autowired
	private EmployeService employeService;
	
	//-----------------------Employee login starts---------------------------------
		@PostMapping("/employeeLogin")
		public ResponseEntity<?> loginUser(@RequestBody Map<String, String> employee){
//			   System.out.println("LOGIN CONTROLLER CALLED");

			String email = employee.get("email");
			String password = employee.get("password");
			
			if (email == null || password == null) {
			    return ResponseEntity.badRequest()
			            .body("Email and password are required");
			}
			
			Employee loggedInEmployee = employeService.EmployeeLoginService(email, password);
			
			if(loggedInEmployee == null) {
				return ResponseEntity
							.status(HttpStatus.UNAUTHORIZED)
							.body("Invalid email or password");
			}
			
			loggedInEmployee.setPassword(null);
			
			return ResponseEntity.ok(loggedInEmployee);
		}
		//-----------------------Employee login finished---------------------------------
		
		
		//-----------------------Get all employee start---------------------------------
		@GetMapping("/employee")
		public List<Employee> getAllEmployee(){
			return employeService.getAllEmployeeService();
		}
		//-----------------------Get all employee finished---------------------------------
		
		
		//-----------Add Employee start---------------------------------
		@PostMapping("/addEmployee")
		public Employee AddEmployeeDetails(@RequestBody Employee employee) {
			return employeService.AddEmployeeDetailsService(employee);
		}
		//-----------Add Employee finished---------------------------------
		
		//-----------Edit Employee start---------------------------------
		@PutMapping("/updateEmployee")
		public ResponseEntity<?> updateEmployeeDetails(
		        @RequestParam String oldEmail,
		        @RequestBody Employee newEmploye) {

		    Employee updatedEmploye =
		            employeService.editEmployeeDetailsService(oldEmail, newEmploye);

		    if (updatedEmploye != null) {

		        return ResponseEntity.ok("Employee details updated successfully!");

		    } else {

		        return ResponseEntity.status(HttpStatus.NOT_FOUND)
		                .body("Employee not found!");
		    }
		}
		//-----------Edit Employee finished---------------------------------
		
		@DeleteMapping("/deleteEmployee")
		public String deleteEmployeeDetails(@RequestParam String email)
		{
			try {
				employeService.deleteEmployeeDetailsService(email);
				return "Employee details deleted successfully";
			}
			catch(Exception e) {
				e.printStackTrace();
				return "Employee details deletion failed";
			}
		}
		
		@GetMapping("/getEmployeeByEmail")
		public Optional<Employee> findByEmail(@RequestParam String email){
			return employeService.findByEmailService(email);
		}
}
