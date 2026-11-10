package in.sp.main.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.sp.main.entities.User;
import in.sp.main.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public User AddUserDetailsService(User u) {
		// TODO Auto-generated method stub
		
		return userRepository.save(u);
	}

	@Override
	public User loginUserService(String email, String password) {
		// TODO Auto-generated method stub
		Optional<User> userOptional = userRepository.findByEmail(email);
		
		 if (userOptional.isPresent()) {

	           User user = userOptional.get();

	           if (user.getPassword().equals(password)) {
	                return user;
	          }
	      }

	        return null;
	  }
}
