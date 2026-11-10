package in.sp.main.Controllers;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.multipart.MultipartFile;
import in.sp.main.entities.Course;
import in.sp.main.services.CourseService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class AdminController {
	
	@Autowired
	private CourseService courseService;
	
	@Value("${app.public.images}")
	private String uploadDir;
	
	
	// ***************************Admin login start*******************************
	@PostMapping("/adminLogin")
	public ResponseEntity<?> adminLoginForm(
	        @RequestBody Map<String, String> admin) {

	    String email = admin.get("email");
	    String password = admin.get("password");

	    if (email.equals("admin@gmail.com") &&
	        password.equals("admin123")) {

	        return ResponseEntity.ok(
	            Map.of("message", "Admin login successful")
	        );

	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	            .body(Map.of("message", "Invalid email or password"));
	    }
	}
	// ***************************Admin login end*******************************
	
	
	// ***************************Add course start*******************************
	@PostMapping(value = "/course", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public Course saveCourseDetails(@ModelAttribute Course course, @RequestParam("image") MultipartFile image)
			throws IOException {

		// Check image
		if (image == null || image.isEmpty()) {
			throw new IllegalArgumentException("Please select a course image.");
		}

		// Validate image type
		String contentType = image.getContentType();

		if (!"image/jpeg".equalsIgnoreCase(contentType)) {
			throw new IllegalArgumentException("Only JPG/JPEG images are allowed.");
		}

		// Create images folder
		Path uploadPath = Paths.get(uploadDir);
		Files.createDirectories(uploadPath);

		// Get original filename
		String originalFileName = Paths.get(image.getOriginalFilename()).getFileName().toString();

		// Generate unique filename
		String fileName = UUID.randomUUID() + "_" + originalFileName;

		// Define destination path
		Path filePath = uploadPath.resolve(fileName);

		// Copy image
		Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

		// Store image URL
		course.setImageUrl("/images/" + fileName);

		// Save course details
		return courseService.saveCourseDetailsService(course);
	}
	// ***************************Add course end*******************************
	
	
	// ***************************Edit course start*******************************
	@PutMapping(
		    value = "/updateCourseDetailsForm",
		    consumes = MediaType.MULTIPART_FORM_DATA_VALUE
		)
		public Course updateCourseDetailsForm(
		        @ModelAttribute("newCourseObj") Course newCourseObj,
		        @RequestParam(value = "courseImg", required = false) MultipartFile courseImg)
		        throws IOException {

		    // Find existing course using its name
		    Course oldCourseObj = courseService.getCourseDetails(
		        newCourseObj.getName()
		    );

		    // Check whether course exists
		    if (oldCourseObj == null) {
		        throw new ResponseStatusException(
		            HttpStatus.NOT_FOUND,
		            "Course not found."
		        );
		    }

		    // Preserve the existing database ID
		    newCourseObj.setId(oldCourseObj.getId());

		    // Check whether a new image was uploaded
		    if (courseImg != null && !courseImg.isEmpty()) {

		        // Validate image type
		        String contentType = courseImg.getContentType();

		        if (!"image/jpeg".equalsIgnoreCase(contentType)) {
		            throw new IllegalArgumentException(
		                "Only JPG/JPEG images are allowed."
		            );
		        }

		        // Get original filename
		        String originalFileName = Paths.get(
		            courseImg.getOriginalFilename()
		        ).getFileName().toString();

		        // Generate unique filename
		        String imgName = UUID.randomUUID() + "_" + originalFileName;

		        // Define image path
		        Path imgPath = Paths.get(uploadDir).resolve(imgName);

		        // Create directory if it does not exist
		        Files.createDirectories(imgPath.getParent());

		        // Save new image
		        Files.copy(
		            courseImg.getInputStream(),
		            imgPath,
		            StandardCopyOption.REPLACE_EXISTING
		        );

		        // Set new image URL
		        String imgUrl = "/images/" + imgName;
		        newCourseObj.setImageUrl(imgUrl);

		    } else {

		        // No new image uploaded: retain previous image
		        newCourseObj.setImageUrl(oldCourseObj.getImageUrl());
		    }

		    // Update course details in database
		    return courseService.saveCourseDetailsService(newCourseObj);
		}
	// ***************************Edit course end*******************************


	// ***************************Delete course start*******************************
	@DeleteMapping("/delete")
	public String deleteCourseByName(@RequestParam String courseName) {
		 try {
			 courseService.deleteCourseByNameService(courseName);
			 return "Course details deleted successfully";
		 }
		 catch(Exception e) {
			 e.printStackTrace();
			 return "Course details deletion failed";
		 }
	}
	// ***************************Delete course end*******************************
	
	@GetMapping("/getCoursesName")
	public List<String> getAllCoursesName(){
		return courseService.getAllCoursesNameService();
	}
}
