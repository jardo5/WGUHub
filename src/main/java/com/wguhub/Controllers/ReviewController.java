package com.wguhub.Controllers;

import com.wguhub.DTOs.CourseReviewSummaryDTO;
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

    @GetMapping("/course/{courseCode}")
    public CourseReviewSummaryDTO getReviewsByCourseCode(@PathVariable String courseCode) {
        return reviewService.getReviewsByCourseCode(courseCode);
    }
}
