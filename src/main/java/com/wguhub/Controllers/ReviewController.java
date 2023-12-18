package com.wguhub.Controllers;

import com.wguhub.Models.Review;
import com.wguhub.Services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin({"http://localhost:5173", "http://localhost:8080"})
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/course/{courseId}")
    public List<Review> getReviewsByCourseId(@PathVariable Integer courseId) {
        return reviewService.getReviewsByCourseId(courseId);
    }
}
