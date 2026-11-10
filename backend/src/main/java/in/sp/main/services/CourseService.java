package in.sp.main.services;

import java.util.List;

import in.sp.main.entities.Course;

public interface CourseService {
	 List<Course> getAllCourseDetailsService();
	 Course saveCourseDetailsService(Course c);
	 public Course getCourseDetails(String name);
	 void deleteCourseByNameService(String courseName);
	 List<String> getAllCoursesNameService();
}
