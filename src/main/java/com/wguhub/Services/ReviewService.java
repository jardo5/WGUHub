package com.wguhub.Services;

import com.wguhub.Models.Review;
import com.wguhub.Repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getReviewsByCourseId(Integer courseId) {
        return reviewRepository.findByCourseCourseId(courseId);
    }
}
