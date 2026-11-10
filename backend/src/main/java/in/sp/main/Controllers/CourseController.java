//package in.sp.main.Controllers;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import in.sp.main.entities.Course;
//import in.sp.main.services.CourseService;
package in.sp.main.Controllers;

//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.nio.file.StandardCopyOption;
import java.util.List;
//import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RestController;

import in.sp.main.entities.Course;
import in.sp.main.services.CourseService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class CourseController {

	@Autowired
	private CourseService courseService;

//	@Value("${app.public.images}")
//	private String uploadDir;

	@GetMapping("/course")
	public List<Course> getAllCourseDetails() {
		return courseService.getAllCourseDetailsService();
	}

}
