package com.wguhub.Repository;

import com.wguhub.Models.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByCourseNameContainingIgnoreCaseOrCourseCodeContainingIgnoreCase(String courseName, String courseCode);

    List<Course> findByDegreesDegreeId(int degreeId);

    Optional<Course> findByCourseCode(String courseCode);
}
