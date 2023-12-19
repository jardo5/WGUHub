package com.wguhub.Controllers;

import com.wguhub.Models.Course;
import com.wguhub.Repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


import java.util.List;


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

    @GetMapping("/code/{courseCode}")
    public ResponseEntity<Course> getCourseByCode(@PathVariable String courseCode) {
        return courseRepository.findByCourseCode(courseCode)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/byDegree")
    public List<Course> getCoursesByDegree(@RequestParam int degreeId) {
        return courseRepository.findByDegreesDegreeId(degreeId);
    }
}
