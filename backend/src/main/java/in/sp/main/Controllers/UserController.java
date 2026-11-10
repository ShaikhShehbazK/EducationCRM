package in.sp.main.Controllers;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import in.sp.main.entities.User;
import in.sp.main.services.UserService;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	
	@Autowired
	private UserService userService;
	

	//-----------register starts---------------------------------
	@PostMapping("/register")
	public User AddUserDetails(@Valid @RequestBody User u) {
		return userService.AddUserDetailsService(u);
	}

	//-----------register finished---------------------------------
	

	//-----------------------login starts---------------------------------
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody Map<String, String> user){
//		   System.out.println("LOGIN CONTROLLER CALLED");

		String email = user.get("email");
		String password = user.get("password");
		
		if (email == null || password == null) {
		    return ResponseEntity.badRequest()
		            .body("Email and password are required");
		}
		
		User loggedInUser = userService.loginUserService(email, password);
		
		if(loggedInUser == null) {
			return ResponseEntity
						.status(HttpStatus.UNAUTHORIZED)
						.body("Invalid email or password");
		}
		
		loggedInUser.setPassword(null);
		
		return ResponseEntity.ok(loggedInUser);
	}
	//-----------------------login finished---------------------------------
	
}
