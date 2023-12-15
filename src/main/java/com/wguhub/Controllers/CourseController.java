package com.wguhub.Controllers;

import com.wguhub.Models.Course;
import com.wguhub.Repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin({"http://localhost:5173", "http://localhost:8080"})
@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @GetMapping("/search")
    public List<Course> searchCourses(@RequestParam(required = false) String searchTerm) {
        if (searchTerm != null && !searchTerm.trim().isEmpty()) {
            return courseRepository.findByCourseNameContainingIgnoreCaseOrCourseCodeContainingIgnoreCase(searchTerm, searchTerm);
        } else {
            return getAllCourses();
        }
    }
}
