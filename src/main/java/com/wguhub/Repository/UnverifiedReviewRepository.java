package com.wguhub.Repository;

import com.wguhub.Models.UnverifiedReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UnverifiedReviewRepository extends JpaRepository<UnverifiedReview, Long> {
    Optional<UnverifiedReview> findByVerificationToken(String token);

    boolean existsByUserUserIdAndCourseCourseCode(Integer userId, String courseCode);
}
