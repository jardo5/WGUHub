package com.wguhub.DTOs;

import lombok.Data;

//This DTO is used to convert reviewDate

@Data
public class ReviewDTO {
    private Integer reviewId;
    private Integer reviewRating;
    private Integer reviewDifficulty;
    private Integer reviewWorkload;
    private String reviewText;
    private String reviewDate; // MM-dd-yyyy
}

