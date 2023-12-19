package com.wguhub.Repository;

import com.wguhub.Models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findByCourseCourseCode(String courseCode);

    boolean existsByUserUserIdAndCourseCourseCode(Integer userId, String courseCode);

}
