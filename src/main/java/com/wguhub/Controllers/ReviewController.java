package com.wguhub.Controllers;

import com.wguhub.DTOs.CourseReviewSummaryDTO;
import com.wguhub.DTOs.InitialReviewDTO;
import com.wguhub.DTOs.ReviewUpdateDTO;
import com.wguhub.Services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/course/{courseCode}")
    public CourseReviewSummaryDTO getReviewsByCourseCode(@PathVariable String courseCode) {
        return reviewService.getReviewsByCourseCode(courseCode);
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitReview(@RequestBody InitialReviewDTO reviewDTO) {
        try {
            reviewService.processInitialReview(reviewDTO);
            return new ResponseEntity<>("Review submitted, please check your email to verify.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/verify/{token}")
    public ResponseEntity<?> verifyEmail(@PathVariable String token) {
        try {
            reviewService.verifyReview(token);
            return new ResponseEntity<>("Email verified, review published.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<?> updateReview(@PathVariable int reviewId, @RequestBody ReviewUpdateDTO reviewUpdateDTO) {
        try {
            reviewService.updateReview(reviewId, reviewUpdateDTO);
            return new ResponseEntity<>("Review updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable int reviewId) {
        try {
            reviewService.deleteReview(reviewId);
            return new ResponseEntity<>("Review deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
