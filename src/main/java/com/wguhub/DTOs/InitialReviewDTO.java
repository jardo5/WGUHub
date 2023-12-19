package com.wguhub.DTOs;

import lombok.Data;

//This DTO is used to create a new review for a course

@Data
public class InitialReviewDTO {
    private Integer reviewRating;
    private Integer reviewDifficulty;
    private Integer reviewWorkload;
    private String reviewText;
    private String email;
    private String courseCode;
}
