package com.wguhub.Services;

import com.wguhub.DTOs.ReviewDTO;
import com.wguhub.Models.Review;
import com.wguhub.Repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<ReviewDTO> getReviewsByCourseCode(String courseCode) {
        List<Review> reviews = reviewRepository.findByCourseCourseCode(courseCode);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy");

        return reviews.stream()
                .map(review -> convertToReviewDTO(review, formatter))
                .collect(Collectors.toList());
    }

    private ReviewDTO convertToReviewDTO(Review review, DateTimeFormatter formatter) {
        ReviewDTO dto = new ReviewDTO();
        dto.setReviewId(review.getReviewId());
        dto.setReviewRating(review.getReviewRating());
        dto.setReviewDifficulty(review.getReviewDifficulty());
        dto.setReviewWorkload(review.getReviewWorkload());
        dto.setReviewText(review.getReviewText());

        if (review.getReviewDate() != null) {
            String formattedDate = review.getReviewDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().format(formatter);
            dto.setReviewDate(formattedDate);
        }

        return dto;
    }
}
