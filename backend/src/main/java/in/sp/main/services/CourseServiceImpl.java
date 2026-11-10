package in.sp.main.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.sp.main.entities.Course;
import in.sp.main.repositories.CourseRepository;

@Service
public class CourseServiceImpl implements CourseService{

	@Autowired
	private CourseRepository courseRepository;
	
	@Override
	public List<Course> getAllCourseDetailsService() {
		
		return courseRepository.findAll();
	}

	@Override
	public Course saveCourseDetailsService(Course c) {
		// TODO Auto-generated method stub
		return courseRepository.save(c);
	}

	@Override
	public Course getCourseDetails(String name) {
		// TODO Auto-generated method stub
		return courseRepository.findByName(name);
	}

	@Override
	public void deleteCourseByNameService(String courseName) {
		Course course =  courseRepository.findByName(courseName);
		if(course != null) {
			courseRepository.delete(course);
		}
		else {
			throw new RuntimeException("Course not found with name: "+courseName);
		}
	}

//	@Override
//	public List<String> getAllCoursesNameService() {
//		List<Course> coursesList = courseRepository.findAll();
//		
//		List<String> coursesNameList = new ArrayList<>();
//		
//		for(Course course : coursesList) {
//			String courseName = course.getName();
//			coursesNameList.add(courseName);
//		}
//		return coursesNameList;
//	}
	
	@Override
	public List<String> getAllCoursesNameService() {
		return courseRepository.findAll().stream()
				.map(Course::getName)
				.collect(Collectors.toList());
	}
}
