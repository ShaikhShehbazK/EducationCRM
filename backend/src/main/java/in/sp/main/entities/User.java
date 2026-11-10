package in.sp.main.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
public class User {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column
	    @NotBlank(message = "Name is required")
	    @Pattern(
	        regexp = "^[a-zA-Z ]{5,25}$",
	        message = "Invalid name format"
	    )
	    private String name;

	    @Column
	    @NotBlank(message = "Email is required")
	    @Pattern(
	        regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
	        message = "Invalid email format"
	    )
	    private String email;

	    @Column
	    @NotBlank(message = "Password is required")
	    @Pattern(	
	        regexp = "^[a-zA-Z0-9]{5,25}$",
	        message = "Invalid password format"
	    )
	    private String password;

	    @Column
	    @NotBlank(message = "Phone number is required")
	    @Pattern(
	        regexp = "^[0-9]{10}$",
	        message = "Invalid phone number format"
	    )
	    private String phoneno;

	    @Column
	    @NotBlank(message = "City is required")
	    @Pattern(
	        regexp = "^[a-zA-Z ]{3,25}$",
	        message = "Invalid city format"
	    )
	    private String city;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhoneno() {
		return phoneno;
	}
	public void setPhoneno(String phoneno) {
		this.phoneno = phoneno;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	
	
}
