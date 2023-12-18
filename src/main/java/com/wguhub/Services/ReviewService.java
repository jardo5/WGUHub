package com.wguhub.Services;

import com.wguhub.DTOs.ReviewDTO;
import com.wguhub.DTOs.CourseReviewSummaryDTO;
import com.wguhub.Models.Review;
import com.wguhub.Repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.DoubleSummaryStatistics;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public CourseReviewSummaryDTO getReviewsByCourseCode(String courseCode) {
        List<Review> reviews = reviewRepository.findByCourseCourseCode(courseCode);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy");

        List<ReviewDTO> reviewDTOs = reviews.stream()
                .map(review -> convertToReviewDTO(review, formatter))
                .collect(Collectors.toList());

        DoubleSummaryStatistics ratingStats = reviewDTOs.stream()
                .mapToDouble(ReviewDTO::getReviewRating)
                .summaryStatistics();
        DoubleSummaryStatistics difficultyStats = reviewDTOs.stream()
                .mapToDouble(ReviewDTO::getReviewDifficulty)
                .summaryStatistics();
        DoubleSummaryStatistics workloadStats = reviewDTOs.stream()
                .mapToDouble(ReviewDTO::getReviewWorkload)
                .summaryStatistics();

        CourseReviewSummaryDTO summaryDTO = new CourseReviewSummaryDTO();
        summaryDTO.setReviews(reviewDTOs);
        summaryDTO.setAverageRating(ratingStats.getAverage());
        summaryDTO.setAverageDifficulty(difficultyStats.getAverage());
        summaryDTO.setAverageWorkload(workloadStats.getAverage());

        return summaryDTO;
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
