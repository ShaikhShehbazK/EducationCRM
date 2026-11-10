package in.sp.main.services;


import in.sp.main.entities.User;

public interface UserService {
	
	public User AddUserDetailsService(User u);
	public User loginUserService(String email,String password);
}
