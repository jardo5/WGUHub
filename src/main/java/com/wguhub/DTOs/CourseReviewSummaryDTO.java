package com.wguhub.DTOs;

import lombok.Data;

import java.util.List;

//This DTO is used to return a list of reviews for a course, along with the average rating, difficulty, and workload

@Data
public class CourseReviewSummaryDTO {
    private List<ReviewDTO> reviews;
    private Double averageRating;
    private Double averageDifficulty;
    private Double averageWorkload;
}
