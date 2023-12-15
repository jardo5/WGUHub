package com.wguhub.Repository;

import com.wguhub.Models.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {

    @Query("SELECT c FROM Course c WHERE " +
            "LOWER(c.course_name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(c.course_code) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Course> findByCourseNameOrCourseCodeContainingIgnoreCase(String searchTerm);
}
